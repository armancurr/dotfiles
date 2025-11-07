case $- in
    *i*)
        export BUN_INSTALL="$HOME/.bun";
        export PATH="$HOME/.local/bin:$BUN_INSTALL/bin:$PATH";

        alias .="cd ..";
        alias ..="cd ../..";
        alias ls='eza'

        eval "$(starship init bash)"
        eval "$(zoxide init bash)";
        ;;
    *) return;;
esac
