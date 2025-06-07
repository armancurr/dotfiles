test -f ~/.profile && . ~/.profile
test -f ~/.bashrc && . ~/.bashrc

update_prompt() {
    local C_BLUE="\[\033[38;2;98;166;255m\]"
    local C_GREEN="\[\033[38;2;88;199;96m\]"
    local C_PINK="\[\033[38;2;240;91;141m\]"
    local C_WHITE="\[\033[38;2;255;255;255m\]"
    local C_RESET="\[\033[0m\]"

    local git_info=""
    if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        local branch_name=$(git rev-parse --abbrev-ref HEAD)
        local git_prefix="${C_WHITE}git:"
        local branch_color=$C_GREEN

        if [[ -n "$(git status --porcelain)" ]]; then
            branch_color=$C_PINK
        fi
        git_info="${C_GREEN}git:(${branch_color}${branch_name}${C_GREEN})"
    fi

    PS1=" ${C_GREEN}➔ ${C_BLUE}\W ${git_info}${C_RESET} ${C_WHITE}➔ ${C_RESET}"
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
alias ..="cd .."
alias ...="cd ../.."
alias pwrite="bunx prettier --write ."
