local wezterm = require("wezterm")

return {
  -- Window configuration
  window_decorations = "TITLE",  -- Show close, minimize, and maximize buttons
  window_background_opacity = 1,
  initial_cols = 70,
  initial_rows = 18,
  enable_tab_bar = false,
  -- Padding settings
  window_padding = {
    left = 20,
    right = 20,
    top = 20,
    bottom = 20,
  },
  -- Font configuration
  font = wezterm.font("JetBrains Mono"),
  font_size = 12,
  -- Color scheme (Ultra Dark Tokyo Night theme)
  colors = {
    background = "#0a0b10",
    foreground = "#c0caf5",
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
  -- Cursor settings
  cursor_thickness = 1,  -- Set thickness to match font's underline thickness
  cursor_blink_rate = 500,  -- Adjusted for smooth blinking
  -- Mouse settings
  hide_mouse_cursor_when_typing = true,
  -- Shell settings
  default_prog = { "C:\\Windows\\System32\\wsl.exe", "--login" },
  -- Key bindings
  keys = {
    { key = "C", mods = "CTRL", action = wezterm.action.CopyTo("Clipboard") },
    { key = "V", mods = "CTRL", action = wezterm.action.PasteFrom("Clipboard") },
  },
  -- Smooth scrolling settings
  scrollback_lines = 10000,  -- Increase scrollback history
  scroll_to_bottom_on_input = true,  -- Scroll to bottom on input
}
