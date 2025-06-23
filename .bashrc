case $- in
    *i*) ;;
      *) return;;
esac

update_prompt() {
    local NORD_FROST_BLUE="\[\033[38;2;136;192;208m\]"
    local NORD_FROST_ICE="\[\033[38;2;129;161;193m\]"
    local NORD_SNOW_STORM="\[\033[38;2;216;222;233m\]"
    local NORD_AURORA_GREEN="\[\033[38;2;163;190;140m\]"
    local NORD_AURORA_YELLOW="\[\033[38;2;235;203;139m\]"
    local C_RESET="\[\033[0m\]"

    local git_info=""
    if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        local branch_name=$(git rev-parse --abbrev-ref HEAD)
        local git_prefix="${NORD_SNOW_STORM}git:"
        local branch_color=$NORD_AURORA_GREEN

        if [[ -n "$(git status --porcelain)" ]]; then
            branch_color=$NORD_AURORA_YELLOW
        fi
        git_info=" ${git_prefix}(${branch_color}${branch_name}${NORD_SNOW_STORM})"
    fi

    PS1="${NORD_FROST_BLUE}➔ ${NORD_FROST_ICE}\W${git_info} ${NORD_SNOW_STORM}➔ ${C_RESET}"
}

PROMPT_COMMAND=update_prompt

alias bn="bun init"
alias bi="bun install"
alias ba="bun add"
alias bu="bun uninstall"
alias bd="bun dev"
alias bs="bun start"
alias bb="bun run build"
alias bunx="bun x"
alias bxs="bun x shadcn@latest"

alias nn="npm init"
alias ni="npm install"
alias na="npm install"
alias nu="npm uninstall"
alias ns="npm start"
alias nd="npm run dev"
alias nb="npm run build"
alias nxs="npx shadcn-ui@latest add"

alias pn="pnpm init"
alias pi="pnpm install"
alias pa="pnpm add"
alias pr="pnpm remove"
alias ps="pnpm start"
alias pd="pnpm dev"
alias pb="pnpm build"
alias px="pnpm dlx"
alias pxs="pnpm dlx shadcn-ui@latest add"

alias gs="git status --short"
alias gd="git diff"
alias ga="git add"
alias gc="git commit -m"
alias gp="git push"
alias gu="git pull"
alias gl='git log --oneline --graph --decorate --all'
alias gb="git branch"
alias gco="git checkout"
alias gi="git init"
alias gcl="git clone"

alias cls="clear"
alias .="cd .."
alias ..="cd ../.."
alias pwrite="bunx prettier --write ."

export PATH="$HOME/.local/bin:$PATH"
eval "$(zoxide init bash)"
