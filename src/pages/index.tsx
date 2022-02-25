import { GetServerSideProps } from "next"
import { Container, Grid, TextField, Stack, Link } from '@mui/material'

interface Props {
  test: string
}

export default function Page ({ test }: Props) {

  return (
    <>
      <Grid container spacing={2} sx={{ pt: 2, px: 4 }}>
        <Grid item xs={4} >
          <Link href="form">
            フォーム・バリデーション
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link href="hook">
            hook
          </Link>
        </Grid>
      </Grid>
    </>
  )
}

// SSR
export const getServerSideProps: GetServerSideProps = async ({ req }): Promise<{ props: Props }> => {
  return {
    props: {
      test: 'テスト'
    }
  }
}