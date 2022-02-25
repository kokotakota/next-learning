import { useState, ReactNode } from 'react'
import NextLink from 'next/link'
import Router from 'next/router'

import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'

import { useDispatch } from 'react-redux'
import { userSlice, useUserSelector } from 'store/user'

const appBarHeight = 50
const drawerWidth = 240
const toolbarVariant = "dense"

export default function DefaultLayout  ({ children }: { children: ReactNode }) {
  const [drawer, setDrawer] = useState<boolean>(false)
  const theme = useTheme()

  const dispatch = useDispatch()
  const user = useUserSelector()

  const onSignIn = () => {
    Router.push('/auth/sign-in')
  }

  const onSignOut = async () => {
    // ログアウト処理
    dispatch(userSlice.actions.reset())
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: theme.zIndex.drawer + 1 }}
        /*
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
        とすれば、useThemeしなくてもthemeにアクセスできる
        */
      >
        <Toolbar
          variant={toolbarVariant}
          sx={{ height: appBarHeight }}
        >
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawer(!drawer)}
          >
            <MenuIcon />
          </IconButton>
          <NextLink href="/" passHref>
            <Typography variant="h6" style={{ cursor: 'pointer' }}>
              Title
            </Typography>
          </NextLink>
          <div style={{ flexGrow: 1 }} />
          { user.id
            ? <Button color="inherit" onClick={onSignOut}>ログアウト</Button>
            : <Button color="inherit" onClick={onSignIn}>ログイン</Button>
          }
        </Toolbar>
      </AppBar>
      {/* offset */}
      <Toolbar variant={toolbarVariant} />

      <Drawer
        open={drawer}
        anchor="left" // default
        variant="persistent"
        sx={{
          [`& .MuiDrawer-paper`]: {
            pt: `${appBarHeight}px`,
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
      >
      </Drawer>

      <main>
        <Box sx={
          drawer ? {
            pt: 2,
            px: 4,
            ml: `${drawerWidth}px`,
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen
            })
          }
          : {
            pt: 2,
            px: 4,
            ml: 0,
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen
            })
          }
        }>
          {children}
        </Box>
      </main>
    </>
  )
}