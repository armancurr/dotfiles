case $- in
    *i*) ;;
      *) return;;
esac

update_prompt() {
    local VERCEL_BLUE="\[\033[38;2;98;166;255m\]"
    local VERCEL_GREEN="\[\033[38;2;88;199;96m\]"
    local VERCEL_YELLOW="\[\033[38;2;249;153;2m\]"
    local VERCEL_WHITE="\[\033[38;2;237;237;237m\]" 
    local VERCEL_GRAY="\[\033[38;2;161;161;161m\]"
    local VERCEL_PINK="\[\033[38;2;240;91;141m\]"
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

    PS1="${VERCEL_BLUE}\W${git_info} ${VERCEL_WHITE}➔ ${C_RESET}"
}

PROMPT_COMMAND=update_prompt

# Persistent history settings
# export HISTFILESIZE=10000
# export HISTSIZE=10000
# export HISTCONTROL=ignoredups:erasedups
# shopt -s histappend

# Save history after each command
# export PROMPT_COMMAND="history -a; history -c; history -r; $PROMPT_COMMAND"

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

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

function y() {
	local tmp="$(mktemp -t "yazi-cwd.XXXXXX")" cwd
	yazi "$@" --cwd-file="$tmp"
	IFS= read -r -d '' cwd < "$tmp"
	[ -n "$cwd" ] && [ "$cwd" != "$PWD" ] && builtin cd -- "$cwd"
	rm -f -- "$tmp"
}