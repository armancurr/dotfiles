export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
export PATH="/c/Users/arman/.opencode/bin:$PATH"
export PATH="/c/Users/arman/.amp/bin:$PATH"

PEACH='\033[38;2;255;199;153m'
MINT='\033[38;2;153;255;228m'
RED='\033[38;2;255;128;128m'
RESET='\033[0m'
GIT_ICON=''

git_prompt() {
    local branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
    if [ -n "$branch" ]; then
        printf " ${GIT_ICON} ${PEACH}git(%s${PEACH})${RESET}" "$branch"
    fi
}

PS1="\[${MINT}\]\W\[${RESET}\]\$(git_prompt) ❯ "

eval "$(zoxide init bash)";
