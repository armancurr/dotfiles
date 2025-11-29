local wezterm                    = require "wezterm"
local config                     = wezterm.config_builder()

config.front_end                 = "WebGpu"

config.font_size                 = 14.0
config.font                      = wezterm.font {
  family            = "GeistMono NFM",
  weight            = "Regular",
  harfbuzz_features = { "calt=0", "clig=0", "liga=0" },
}

config.colors                    = {
  foreground      = "#FFFFFF",
  background      = "#101010",
  cursor_bg       = "#FFC799",
  cursor_fg       = "#101010",
  cursor_border   = "#FFC799",
  selection_fg    = "#FFFFFF",
  selection_bg    = "#343434",
  scrollbar_thumb = "#343434",

  ansi            = {
    "#101010",
    "#FF8080",
    "#99FFE4",
    "#FFC799",
    "#A0A0A0",
    "#FFC799",
    "#99FFE4",
    "#A0A0A0",
  },

  brights         = {
    "#505050",
    "#FF8080",
    "#99FFE4",
    "#FFCFA8",
    "#FFFFFF",
    "#FFCFA8",
    "#99FFE4",
    "#FFFFFF",
  },
}

config.window_background_opacity = 0.80
config.win32_system_backdrop     = "Mica"

config.window_padding            = {
  left   = 30,
  right  = 30,
  top    = 30,
  bottom = 30,
}

config.default_cursor_style      = "BlinkingUnderline"
config.cursor_blink_rate         = 500
config.cursor_blink_ease_in      = "Constant"
config.cursor_blink_ease_out     = "Constant"

config.enable_tab_bar            = false
config.window_close_confirmation = "NeverPrompt"

config.default_prog              = { "C:/Program Files/Git/bin/bash.exe", "-l" }

return config
