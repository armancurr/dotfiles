case $- in
    *i*)
        export NVM_DIR="$HOME/.nvm";
        export BUN_INSTALL="$HOME/.bun";
        export PATH="$HOME/.local/bin:$BUN_INSTALL/bin:$PATH";

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

        alias bn="bun init";
        alias bi="bun install";
        alias ba="bun add";
        alias bdsm="bun dev";
        alias bb="bun run build";
        alias bunx="bun x";
        alias bxs="bun x shadcn@latest";

        alias gd="git diff --output-indicator-new=' ' --output-indicator-old=' '";
        alias ga="git add";
        alias gc="git commit -m";
        alias gp="git push";
        alias gl="git log --all --graph";
        alias gb="git branch";
        alias gi="git init";

        alias .="cd ..";
        alias ..="cd ../..";

        eval "$(starship init bash)";
        eval "$(zoxide init bash)";

        ;;
    *) return;;
esac
