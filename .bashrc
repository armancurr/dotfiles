case $- in
    *i*) ;;
      *) return;;
esac

update_prompt() {
    local DIR_COLOR="\[\033[38;2;212;212;212m\]"
    local GIT_PREFIX_COLOR="\[\033[38;2;99;99;99m\]"
    local GIT_BRANCH_CLEAN_COLOR="\[\033[38;2;240;240;240m\]"
    local GIT_BRANCH_DIRTY_COLOR="\[\033[38;2;169;169;169m\]"
    local PROMPT_SYMBOL_COLOR="\[\033[38;2;212;212;212m\]"
    local PARENTHESES_COLOR="\[\033[38;2;99;99;99m\]"
    local C_RESET="\[\033[0m\]"

    local git_info=""
    if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        local branch_name=$(git rev-parse --abbrev-ref HEAD)
        local git_prefix="${GIT_PREFIX_COLOR}git:"
        local branch_color=$GIT_BRANCH_CLEAN_COLOR

        if [[ -n "$(git status --porcelain)" ]]; then
            branch_color=$GIT_BRANCH_DIRTY_COLOR
        fi
        git_info=" ${git_prefix}${PARENTHESES_COLOR}(${branch_color}${branch_name}${PARENTHESES_COLOR})"
    fi

    PS1="${DIR_COLOR}\W${git_info} ${PROMPT_SYMBOL_COLOR}➔ ${C_RESET}"
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