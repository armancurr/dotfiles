eval "$(starship init zsh)"
eval "$(zoxide init zsh)"
# opencode
export PATH=/Users/arman/.opencode/bin:$PATH

# bun completions
[ -s "/Users/arman/.bun/_bun" ] && source "/Users/arman/.bun/_bun"

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
