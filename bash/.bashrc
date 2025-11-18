export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
export PATH=/c/Users/arman/.opencode/bin:$PATH

alias .="cd ..";
alias ls="eza"
alias ff="fastfetch"

eval "$(uv generate-shell-completion bash)"
eval "$(starship init bash)"
eval "$(zoxide init bash)";
