-- init.lua for Neovim
-- Theme: Noir Poimandres Darker
-- This configuration sets up the colors for Neovim's UI and syntax
-- highlighting to faithfully match the provided JSON theme definition.

-- Ensure the terminal can handle true color
vim.opt.termguicolors = true

-- Define a function to apply the color theme
local function apply_theme()
  -- Reset all existing highlight groups to clear any previous settings
  vim.cmd('highlight clear')

  -- Set the background to dark for proper highlight blending
  vim.o.background = 'dark'

  -- Define the color palette based on the JSON theme
  local colors = {
    -- Core UI Colors
    none = 'NONE',
    bg = '#0f1017', -- editor.background
    fg = '#a6accd', -- editor.foreground
    fg_light = '#e4f0fb', -- editor.foreground (brighter variant)
    bg_alt = '#303340', -- sideBar background, input background
    fg_dark = '#767c9d', -- sideBar.foreground
    comment = '#767c9dB0', -- comment foreground

    -- Semantic Colors
    red = '#d0679d', -- errors, deletions
    green = '#5DE4c7', -- success, additions, strings
    yellow = '#fffac2', -- warnings, class names
    blue = '#ADD7FF', -- info, functions, variables
    cyan = '#89ddff', -- secondary blue
    magenta = '#f087bd', -- special functions
    gray_blue = '#91B4D5', -- operators, types
    selection = '#717cb425', -- editor.selectionBackground
    border = '#303340', -- editorIndentGuide.background
  }

  -- A table mapping Neovim highlight groups to the theme's color palette.
  -- This covers both the editor UI (workbench) and syntax highlighting (tokens).
  -- The keys are standard Neovim highlight groups (`:help highlight-groups`).
  -- The values are tables specifying foreground (fg), background (bg), and style (sp, style).
  local highlights = {
    -- ========================================================================
    -- Editor UI (Workbench) Highlights
    -- ========================================================================

    -- Core UI
    Normal = { fg = colors.fg, bg = colors.bg }, -- Default text, editor background
    NormalNC = { fg = colors.fg, bg = colors.bg }, -- Non-current window text
    NormalFloat = { fg = colors.fg, bg = colors.bg_alt }, -- Floating window background
    FloatBorder = { fg = colors.gray_blue, bg = colors.bg_alt }, -- Floating window border
    SignColumn = { bg = colors.bg }, -- Gutter background
    ColorColumn = { bg = colors.selection }, -- Column marker at `colorcolumn`
    Cursor = { fg = colors.bg, bg = colors.fg }, -- The cursor itself
    CursorLine = { bg = colors.selection }, -- Highlight for the current line
    LineNr = { fg = colors.fg_dark .. '80' }, -- Line numbers in the gutter
    CursorLineNr = { fg = colors.fg, bg = colors.selection }, -- Current line number
    VertSplit = { fg = colors.border, bg = colors.bg }, -- Vertical window separator

    -- Status & Tab Line
    StatusLine = { fg = colors.fg, bg = colors.bg }, -- Status line for active window
    StatusLineNC = { fg = colors.fg_dark, bg = colors.bg }, -- Status line for inactive windows
    TabLine = { fg = colors.fg_dark, bg = colors.bg }, -- Tab line, inactive tabs
    TabLineFill = { bg = colors.bg }, -- Empty area of the tab line
    TabLineSel = { fg = colors.fg_light, bg = colors.bg }, -- Selected tab

    -- Pop-up Menu (Completion Menu)
    Pmenu = { fg = colors.fg, bg = colors.bg_alt }, -- Completion menu background
    PmenuSel = { fg = colors.green, bg = colors.bg }, -- Selected item in completion menu
    PmenuSbar = { bg = colors.border }, -- Scrollbar on the completion menu
    PmenuThumb = { bg = colors.fg_dark }, -- Thumb of the scrollbar

    -- Search and Selection
    Search = { bg = '#ADD7FF40', fg = colors.fg_light }, -- Search highlight
    IncSearch = { bg = '#ADD7FF40', fg = colors.fg_light }, -- Incremental search highlight
    Visual = { bg = colors.selection }, -- Visual selection highlight

    -- Diffs
    DiffAdd = { bg = '#50647715' }, -- Added lines in diff
    DiffChange = { bg = colors.selection }, -- Changed lines in diff
    DiffDelete = { bg = '#d0679d20' }, -- Deleted lines in diff
    DiffText = { bg = '#89ddff33' }, -- Changed text within a line

    -- Diagnostics (LSP)
    DiagnosticError = { fg = colors.red }, -- Error messages
    DiagnosticWarn = { fg = colors.yellow }, -- Warning messages
    DiagnosticInfo = { fg = colors.blue }, -- Info messages
    DiagnosticHint = { fg = colors.green }, -- Hint messages
    LspReferenceText = { bg = colors.selection }, -- LSP references highlight

    -- ========================================================================
    -- Syntax (Token) Highlights
    -- Corresponds to Tree-sitter captures (`:h treesitter-highlight-groups`)
    -- ========================================================================
    
    Comment = { fg = colors.comment, style = 'italic' }, -- Comments
    
    String = { fg = colors.green }, -- "hello"
    Character = { fg = colors.green }, -- 'c'
    Number = { fg = colors.green }, -- 123
    Boolean = { fg = colors.cyan }, -- true, false
    Float = { fg = colors.green }, -- 1.23

    Type = { fg = colors.gray_blue .. 'C0' }, -- string, int, MyClass
    Identifier = { fg = colors.fg_light }, -- General variable names
    Function = { fg = colors.blue }, -- myFunction()
    Method = { fg = colors.blue },
    
    Keyword = { fg = colors.fg }, -- var, let, etc.
    KeywordControl = { fg = colors.green .. 'C0' }, -- for, if, while
    KeywordOperator = { fg = colors.gray_blue }, -- and, or, not
    Operator = { fg = colors.gray_blue }, -- +, -, *
    
    PreProc = { fg = colors.green }, -- #include, import, export
    Include = { fg = colors.green },
    
    Constant = { fg = colors.blue }, -- MY_CONSTANT
    Variable = { fg = colors.fg_light },
    ["@variable.builtin"] = { fg = colors.green }, -- `this`, `self`
    ["@variable.parameter"] = { fg = colors.fg_light },
    
    Label = { fg = colors.blue },
    Title = { fg = colors.blue, style = 'bold' }, -- Markdown headers
    
    Tag = { fg = colors.green }, -- HTML tags like <div>
    TagAttribute = { fg = colors.gray_blue }, -- HTML attributes like `class`
    TagDelimiter = { fg = colors.fg }, -- <, >
    
    Punctuation = { fg = colors.fg }, -- (), [], {}
    ["@punctuation.bracket"] = { fg = colors.fg },
    ["@punctuation.delimiter"] = { fg = colors.fg },
    
    -- Specific Overrides from JSON `tokenColors`
    ["@type.definition"] = { fg = colors.blue }, -- `type` keyword in type aliases
    ["@constructor"] = { fg = colors.magenta },
    ["@exception"] = { fg = colors.red }, -- try, catch
    ["@property"] = { fg = colors.fg_light }, -- Object properties
    ["@namespace"] = { fg = colors.gray_blue },
    ["@keyword.function"] = { fg = colors.green }, -- `function` keyword
    ["@constant.builtin"] = { fg = colors.red }, -- null, undefined
  }

  -- Loop through the highlight table and apply each one
  for group, definition in pairs(highlights) do
    vim.api.nvim_set_hl(0, group, definition)
  end
end

-- Execute the function to apply the theme
apply_theme()
