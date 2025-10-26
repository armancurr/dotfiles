case $- in
    *i*)
        export BUN_INSTALL="$HOME/.bun";
        export PATH="$HOME/.local/bin:$BUN_INSTALL/bin:$PATH";

        alias .="cd ..";
        alias ..="cd ../..";

        eval "$(zoxide init bash)";

        VESPER_PRIMARY='\[\e[38;2;255;255;255m\]'
        VESPER_SECONDARY='\[\e[38;2;160;160;160m\]'
        VESPER_MUTED='\[\e[38;2;139;139;139m\]'
        VESPER_ACCENT='\[\e[38;2;255;199;153m\]'
        VESPER_CYAN='\[\e[38;2;153;255;228m\]'
        RESET='\[\e[0m\]'

        git_branch() {
            local branch
            branch=$(git symbolic-ref --short HEAD 2>/dev/null)
            if [ -n "$branch" ]; then
                echo " ${VESPER_MUTED}git (${VESPER_SECONDARY}$branch${VESPER_MUTED})"
            fi
        }

        PS1="${VESPER_CYAN}\W\$(git_branch) ${VESPER_ACCENT}❯${RESET} "

        ;;
    *) return;;
esac
