local wezterm = require "wezterm"
local config = {}

config.window_padding = {
  left   = 40,
  right  = 40,
  top    = 5,
  bottom = 40,
}

config.enable_tab_bar = false

config.font_size = 14.0
config.font = wezterm.font {
  family            = "GeistMono NFM",
  weight            = "Regular",
  harfbuzz_features = { "calt=0", "clig=0", "liga=0" },
}

config.freetype_load_target   = "HorizontalLcd"
config.freetype_render_target = "HorizontalLcd"

config.default_cursor_style  = "BlinkingUnderline"
config.cursor_blink_rate     = 500
config.cursor_blink_ease_in  = "Constant"
config.cursor_blink_ease_out = "Constant"

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

config.default_prog = { "C:/Program Files/Git/bin/bash.exe", "-l" }

return config
