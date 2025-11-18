local wezterm = require "wezterm"
local config = wezterm.config_builder()

config.front_end = "WebGpu"

config.font_size = 14.0
config.font = wezterm.font {
  family            = "GeistMono NFM",
  weight            = "Regular",
  harfbuzz_features = { "calt=0", "clig=0", "liga=0" },
}

config.colors = {
  foreground      = "#c3c9c2",
  background      = "#151515",
  cursor_bg       = "#c3c9c2",
  cursor_fg       = "#151515",
  cursor_border   = "#c3c9c2",
  selection_fg    = "#e7e7e7",
  selection_bg    = "#252525",
  scrollbar_thumb = "#4a4a4a",

  ansi = {
    "#151515",
    "#78535D",
    "#737a6f",
    "#a59e8a",
    "#807c82",
    "#e0c6cd",
    "#6A5E5E",
    "#c3c9c2",
  },

  brights = {
    "#4a4a4a",
    "#78535D",
    "#737a6f",
    "#a59e8a",
    "#807c82",
    "#e0c6cd",
    "#6A5E5E",
    "#e7e7e7",
  },
}

config.window_background_opacity = 0.80
config.win32_system_backdrop     = "Mica"

config.window_padding = {
  left   = 30,
  right  = 30,
  top    = 30,
  bottom = 30,
}

config.default_cursor_style  = "BlinkingUnderline"
config.cursor_blink_rate     = 500
config.cursor_blink_ease_in  = "Constant"
config.cursor_blink_ease_out = "Constant"

config.enable_tab_bar            = false
config.window_close_confirmation = "NeverPrompt"

config.default_prog = { "C:/Program Files/Git/bin/bash.exe", "-l" }

return config