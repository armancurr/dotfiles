export BUN_INSTALL="$HOME/.bun"
export PATH="$HOME/.local/bin:$BUN_INSTALL/bin:$PATH";
export PATH=/c/Users/arman/.opencode/bin:$PATH

alias .="cd ..";
alias ls='eza'

eval "$(uv generate-shell-completion bash)"
eval "$(starship init bash)"
eval "$(zoxide init bash)";
