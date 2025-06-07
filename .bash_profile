# Load existing profile and bashrc if they exist
test -f ~/.profile && . ~/.profile
test -f ~/.bashrc && . ~/.bashrc

# --- Helper Functions ---
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

update_prompt() {
    GIT_BRANCH_PROMPT=$(parse_git_branch)
}

# --- Set PROMPT_COMMAND ---
PROMPT_COMMAND=update_prompt

# --- Vercel Theme Color Palette ---
C_FOREGROUND="\[\033[38;2;237;237;237m\]"
C_PATH="\[\033[38;2;98;166;255m\]"
C_GIT="\[\033[38;2;88;199;96m\]"
C_RESET="\[\033[0m\]"

# --- Custom Prompt (PS1) ---
PS1="${C_PATH}\w${C_GIT}\${GIT_BRANCH_PROMPT}${C_RESET} ${C_FOREGROUND}» ${C_RESET}"

# --- Command Aliases ---

# BUN Aliases
alias bn="bun init"
alias bi="bun install"
alias ba="bun add"
alias bu="bun uninstall"
alias bd="bun dev"
alias bs="bun start"
alias bb="bun run build"
alias bunx="bun x"
alias bxs="bun x shadcn@latest"

# NPM Aliases
alias nn="npm init"
alias ni="npm install"
alias na="npm install"
alias nu="npm uninstall"
alias ns="npm start"
alias nd="npm run dev"
alias nb="npm run build"
alias nxs="npx shadcn-ui@latest add"

# PNPM Aliases
alias pn="pnpm init"
alias pi="pnpm install"
alias pa="pnpm add"
alias pr="pnpm remove"
alias ps="pnpm start"
alias pd="pnpm dev"
alias pb="pnpm build"
alias px="pnpm dlx"
alias pxs="pnpm dlx shadcn-ui@latest add"

# Git Aliases
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

# System & Utility Aliases
alias cls="clear"
alias ..="cd .."
alias ...="cd ../.."
alias pwrite="bunx prettier --write ."
