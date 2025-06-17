# ~/.bash_profile: Executed by bash(1) for login shells.
# Nord Theme Edition

# Source global definitions, if any
if [ -f /etc/profile ]; then
    . /etc/profile
fi

# --- [ Source .bashrc ] ---
# This ensures that aliases and functions are available in login shells.
# Your prompt and aliases will be defined there.
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi

# --- [ User Specific Environment ] ---
# Add any environment variables that should only be set once per login.
# Example:
# export EDITOR=vim
# export PATH="/usr/local/bin:$PATH"
