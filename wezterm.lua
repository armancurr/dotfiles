local wezterm = require 'wezterm'

return {
  -- Window Configuration
  window_padding = {
    left = 30,
    right = 30,
    top = 10,
    bottom = 10,
  },
  window_decorations = "NONE",
  initial_rows = 24,
  initial_cols = 80,
  window_background_opacity = 0.95,
  enable_tab_bar = false,  -- Disable tab bar to match "window_decorations = NONE"

  -- Scrolling Settings
  scrollback_lines = 10000,

  -- Font Configuration
  font = wezterm.font("JetBrains Mono", { weight = "Regular", italic = false }),
  font_size = 12.0,

  -- Color Scheme (Ultra Dark Tokyo Night Theme)
  colors = {
    foreground = "#c0caf5",
    background = "#0a0b10",
    cursor_bg = "#c0caf5",
    cursor_border = "#c0caf5",
    cursor_fg = "#0a0b10",
    selection_bg = "#364a82",
    selection_fg = "#c0caf5",

    ansi = {
      "#0c0d14", -- black
      "#f7768e", -- red
      "#9ece6a", -- green
      "#e0af68", -- yellow
      "#7aa2f7", -- blue
      "#ad8ee6", -- magenta
      "#449dab", -- cyan
      "#c0caf5", -- white
    },
    brights = {
      "#1a1c2a", -- bright black
      "#f7768e", -- bright red
      "#9ece6a", -- bright green
      "#e0af68", -- bright yellow
      "#7aa2f7", -- bright blue
      "#ad8ee6", -- bright magenta
      "#449dab", -- bright cyan
      "#c0caf5", -- bright white
    },
  },

  -- Cursor Settings
  default_cursor_style = "BlinkingUnderline",
  cursor_blink_rate = 350,

  -- Mouse Settings
  hide_mouse_cursor_when_typing = true,

  -- Key Bindings
  keys = {
    {
      key = "V",
      mods = "CTRL|SHIFT",
      action = wezterm.action.PasteFrom("Clipboard"),
    },
    {
      key = "C",
      mods = "CTRL|SHIFT",
      action = wezterm.action.CopyTo("Clipboard"),
    },
  },

  -- Shell Settings
  default_prog = { "C:\\Program Files\\Git\\bin\\bash.exe", "--login", "-i" },

  -- Selection Settings
  selection_word_boundary = " \t│`|:\"'()[]{}<>",
}
