case $- in
  *i*)
    export NVM_DIR="$HOME/.nvm";
    export BUN_INSTALL="$HOME/.bun";
    export PATH="$HOME/.local/bin:$BUN_INSTALL/bin:$PATH";
    unset HISTFILE;

    function update_prompt {
      local DIR_COLOR="\[\033[38;2;170;170;170m\]";
      local GIT_PREFIX_COLOR="\[\033[38;2;98;98;98m\]";
      local PARENTHESES_COLOR="\[\033[38;2;98;98;98m\]";
      local GIT_BRANCH_CLEAN_COLOR="\[\033[38;2;135;135;135m\]";
      local GIT_BRANCH_DIRTY_COLOR="\[\033[38;2;182;182;182m\]";
      local PROMPT_SYMBOL_COLOR="\[\033[38;2;180;180;180m\]";
      local C_RESET="\[\033[0m\]";
      local git_info="";

      if git rev-parse --git-dir > /dev/null 2>&1; then
        local branch=$(git branch --show-current 2>/dev/null || echo "master");
        local color=$GIT_BRANCH_CLEAN_COLOR;

        if [[ $(git status --porcelain 2>/dev/null | wc -l) -gt 0 ]]; then
          color=$GIT_BRANCH_DIRTY_COLOR;
        fi

        git_info=" ${GIT_PREFIX_COLOR}git:${PARENTHESES_COLOR}(${color}${branch}${PARENTHESES_COLOR})";
      fi

      PS1=" ${DIR_COLOR}\W${git_info} ${PROMPT_SYMBOL_COLOR}❯ ${C_RESET}";
    }
    PROMPT_COMMAND=update_prompt;

    function _load_nvm {
      unset -f node;
      unset -f npm;
      unset -f npx;
      [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh";
      [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion";
    }

    function node { _load_nvm; command node "$@"; }
    function npm  { _load_nvm; command npm "$@"; }
    function npx  { _load_nvm; command npx "$@"; }

    eval "$(zoxide init bash)";

    alias bn="bun init";
    alias bi="bun install";
    alias ba="bun add";
    alias bu="bun uninstall";
    alias bd="bun dev";
    alias bs="bun start";
    alias bb="bun run build";
    alias bunx="bun x";
    alias bxs="bun x shadcn@latest";

    alias nn="npm init";
    alias ni="npm install";
    alias na="npm install";
    alias nu="npm uninstall";
    alias ns="npm start";
    alias nd="npm run dev";
    alias nb="npm run build";
    alias nxs="npx shadcn@latest add";

    alias gs="git status --short";
    alias gd="git diff";
    alias ga="git add";
    alias gc="git commit -m";
    alias gp="git push";
    alias gu="git pull";
    alias gl="git log --oneline --graph --decorate --all";
    alias gb="git branch";
    alias gco="git checkout";
    alias gi="git init";
    alias gcl="git clone";

    alias cl="clear";
    alias .="cd ..";
    alias ..="cd ../..";
    alias pr="bunx prettier --write .";
    alias tx="tmux";
    alias ta="tmux attach";
    alias td="tmux detach";
    alias tk="tmux kill-session";
    alias tl="tmux ls";

    ;;
  *) return;;
esac