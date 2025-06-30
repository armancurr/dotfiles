case $- in
    *i*) ;;
      *) return;;
esac

update_prompt() {
    # Vercel Dark theme colors
    local VERCEL_BLUE="\[\033[38;2;98;166;255m\]"      # #62a6ff - for main prompt and directory
    local VERCEL_GREEN="\[\033[38;2;88;199;96m\]"      # #58c760 - for clean git branch
    local VERCEL_YELLOW="\[\033[38;2;249;153;2m\]"     # #f99902 - for dirty git branch
    local VERCEL_WHITE="\[\033[38;2;237;237;237m\]"    # #ededed - for primary text
    local VERCEL_GRAY="\[\033[38;2;161;161;161m\]"     # #a1a1a1 - for secondary text
    local VERCEL_PINK="\[\033[38;2;240;91;141m\]"      # #f05b8d - for git prefix
    local C_RESET="\[\033[0m\]"

    local git_info=""
    if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        local branch_name=$(git rev-parse --abbrev-ref HEAD)
        local git_prefix="${VERCEL_PINK}git:"
        local branch_color=$VERCEL_GREEN

        if [[ -n "$(git status --porcelain)" ]]; then
            branch_color=$VERCEL_YELLOW
        fi
        git_info=" ${git_prefix}(${branch_color}${branch_name}${VERCEL_PINK})"
    fi

    PS1="${VERCEL_BLUE}➔ ${VERCEL_BLUE}\W${git_info} ${VERCEL_WHITE}➔ ${C_RESET}"
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

alias gs="git status"
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
