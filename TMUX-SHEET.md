# Tmux Keyboard Navigation Cheatsheet

*Your prefix key is `Ctrl+s` (customized from default `Ctrl+b`)*

## Getting Started

| Shortcut | Description |
|----------|-------------|
| `Ctrl+s ?` | Show all key bindings |
| `Ctrl+s :` | Enter command mode |
| `Ctrl+s r` | Reload config file |

## Session Management

| Shortcut | Description |
|----------|-------------|
| `Ctrl+s d` | Detach from session |
| `Ctrl+s s` | Show all sessions |
| `Ctrl+s $` | Rename current session |
| `Ctrl+s (` / `)` | Switch to previous/next session |

### Session Commands (from terminal)
```bash
tmux                    # Start new session
tmux new -s myname      # Start new named session
tmux ls                 # List all sessions
tmux a                  # Attach to last session
tmux a -t myname        # Attach to named session
tmux kill-session -t myname  # Kill named session
```

## Window Management (Tabs)

| Shortcut | Description |
|----------|-------------|
| `Ctrl+s c` | Create new window |
| `Ctrl+s n` | Next window |
| `Ctrl+s p` | Previous window |
| `Ctrl+s l` | Last used window |
| `Ctrl+s 0-9` | Switch to window by number |
| `Ctrl+s w` | List windows (interactive) |
| `Ctrl+s ,` | Rename current window |
| `Ctrl+s f` | Find window by name |
| `Ctrl+s &` | Kill current window |
| `Ctrl+s .` | Move window to new number |

## Pane Management (Splits)

### Creating Panes
| Shortcut | Description |
|----------|-------------|
| `Ctrl+s %` | Split vertically (side by side) |
| `Ctrl+s "` | Split horizontally (top/bottom) |

### Navigating Panes
| Shortcut | Description |
|----------|-------------|
| `Ctrl+s ←→↑↓` | Navigate between panes |
| `Ctrl+s o` | Cycle through panes |
| `Ctrl+s q` | Show pane numbers |
| `Ctrl+s q 0-9` | Jump to pane by number |
| `Ctrl+s ;` | Toggle to last active pane |

### Pane Operations
| Shortcut | Description |
|----------|-------------|
| `Ctrl+s z` | Zoom/unzoom current pane (fullscreen) |
| `Ctrl+s x` | Kill current pane |
| `Ctrl+s !` | Convert pane to window |
| `Ctrl+s {` / `}` | Move pane left/right |
| `Ctrl+s Space` | Toggle between pane layouts |

### Resizing Panes
| Shortcut | Description |
|----------|-------------|
| `Ctrl+s Ctrl+←→↑↓` | Resize panes (hold Ctrl+s, then arrows) |

## Copy Mode (Scrolling & Text Selection)

| Shortcut | Description |
|----------|-------------|
| `Ctrl+s [` | Enter copy mode |
| `q` | Exit copy mode |
| `Space` | Start text selection |
| `Enter` | Copy selection and exit |
| `Ctrl+s ]` | Paste copied text |
| `←→↑↓` or `h j k l` | Navigate in copy mode |

## Command Mode

Enter command mode with `Ctrl+s :`, then use these commands:

### Resizing Commands
```
resize-pane -D 20    # Resize down 20 lines
resize-pane -U 20    # Resize up 20 lines
resize-pane -L 20    # Resize left 20 columns
resize-pane -R 20    # Resize right 20 columns
```

### Information Commands
```
list-keys           # Show all key bindings
list-panes          # Show all panes
list-windows        # Show all windows
list-sessions       # Show all sessions
```

### Advanced Pane Operations
```
swap-pane -s 3 -t 1          # Swap pane 3 with pane 1
join-pane -t :1             # Move current pane to window 1
split-window -h              # Split horizontally
split-window -v              # Split vertically
```

## Useful Tips

1. **Copy Mode Navigation**: Once in copy mode (`Ctrl+s [`), you can scroll through history using arrow keys or vim-style navigation (`h j k l`)

2. **Pane Zooming**: Use `Ctrl+s z` to make a pane fullscreen temporarily - great for focusing on one task

3. **Quick Pane Switching**: `Ctrl+s q` shows numbers briefly - type the number quickly to jump to that pane

4. **Session Workflow**: 
   - Detach with `Ctrl+s d` 
   - Work on other things
   - Reattach later with `tmux a`

5. **Window Naming**: Use `Ctrl+s ,` to give windows meaningful names for better organization

## Configuration Notes

- Your prefix is `Ctrl+s` instead of the default `Ctrl+b`
- Mouse support is disabled for keyboard-only navigation
- Status bar updates every second for accurate time display
- Config can be reloaded with `Ctrl+s r`

---

*Sources: [QuickRef.me Tmux](https://quickref.me/tmux), [Coderwall Tmux Shortcuts](https://coderwall.com/p/mxzdrg/keyboard-shortcuts-i-use-every-day-in-tmux), [Henrik's Tmux Cheatsheet](https://gist.github.com/henrik/1967800)* 