local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable",
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup({
  -- Vesper theme
  {
    "datsfilipe/vesper.nvim",
    priority = 1000, -- Load theme first
    config = function()
      require("vesper").setup({
        transparent = false,
        italics = {
          comments = true,
          keywords = true,
          functions = true,
          strings = true,
          variables = true,
        },
      })
      vim.cmd.colorscheme("vesper")
    end,
  },
})

vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.mouse = 'a'
vim.opt.ignorecase = true
vim.opt.smartcase = true
vim.opt.termguicolors = true
