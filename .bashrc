# ~/.bashrc: Executed by bash(1) for non-login shells.
# Nord Theme Edition

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# --- [ Custom Prompt with Nord Theme ] ---
# This function updates the PS1 variable before each prompt is displayed.

update_prompt() {
    # Nord Color Palette (24-bit color)
    # See: https://www.nordtheme.com/docs/colors-and-palettes
    local NORD_FROST_BLUE="\[\033[38;2;136;192;208m\]" # nord8
    local NORD_FROST_ICE="\[\033[38;2;129;161;193m\]"  # nord9
    local NORD_SNOW_STORM="\[\033[38;2;216;222;233m\]" # nord4
    local NORD_AURORA_GREEN="\[\033[38;2;163;190;140m\]" # nord14 (Clean git state)
    local NORD_AURORA_YELLOW="\[\033[38;2;235;203;139m\]" # nord13 (Dirty git state)
    local C_RESET="\[\033[0m\]"

    # Git information
    local git_info=""
    if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
        local branch_name=$(git rev-parse --abbrev-ref HEAD)
        local git_prefix="${NORD_SNOW_STORM}git:"
        local branch_color=$NORD_AURORA_GREEN # Default to green (clean)

        # If there are uncommitted changes, change color to yellow (dirty)
        if [[ -n "$(git status --porcelain)" ]]; then
            branch_color=$NORD_AURORA_YELLOW
        fi
        git_info=" ${git_prefix}(${branch_color}${branch_name}${NORD_SNOW_STORM})"
    fi

    # PS1: The Primary Prompt String
    # Structure: ➔ /path/to/dir git:(branch) ➔
    PS1="${NORD_FROST_BLUE}➔ ${NORD_FROST_ICE}\W${git_info} ${NORD_SNOW_STORM}➔ ${C_RESET}"
}

# Run the update_prompt function before displaying the prompt
PROMPT_COMMAND=update_prompt


# --- [ Aliases ] ---
# For better organization, aliases are grouped by tool.

# --- Bun Package Manager ---
alias bn="bun init"
alias bi="bun install"
alias ba="bun add"
alias bu="bun uninstall"
alias bd="bun dev"
alias bs="bun start"
alias bb="bun run build"
alias bunx="bun x"
alias bxs="bun x shadcn@latest"

# --- NPM Package Manager ---
alias nn="npm init"
alias ni="npm install"
alias na="npm install"
alias nu="npm uninstall"
alias ns="npm start"
alias nd="npm run dev"
alias nb="npm run build"
alias nxs="npx shadcn-ui@latest add"

# --- PNPM Package Manager ---
alias pn="pnpm init"
alias pi="pnpm install"
alias pa="pnpm add"
alias pr="pnpm remove"
alias ps="pnpm start"
alias pd="pnpm dev"
alias pb="pnpm build"
alias px="pnpm dlx"
alias pxs="pnpm dlx shadcn-ui@latest add"

# --- Git Workflow ---
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

# --- General Utilities & Navigation ---
alias cls="clear"
alias .="cd .."
alias ..="cd ../.."
alias pwrite="bunx prettier --write ."
