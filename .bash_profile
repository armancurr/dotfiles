if [ -f /etc/profile ]; then
  . /etc/profile
fi

if [ -f ~/.bashrc ]; then
  . ~/.bashrc
fi

export PATH="$HOME/.local/bin:$PATH"