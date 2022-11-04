import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Code,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { erc721ABI, useContractRead } from 'wagmi'
import { Layout } from '../components/layout/Layout'

const GOERLI_CONTRACT_ADDRESS = '0x982659f8ce3988096A735044aD42445D6514ba7e'

const TokenGated: NextPage = () => {
  const address = '0x0'

  const [hasNft, setHasNft] = useState(false)

  const { data, isError, isLoading } = useContractRead({
    address: GOERLI_CONTRACT_ADDRESS,
    abi: erc721ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  useEffect(() => {
    if (!isLoading && data && data.toNumber()) {
      const numberOfNfts = data.toNumber()

      if (numberOfNfts > 0) {
        setHasNft(true)
      }
    }
  }, [data, isLoading])

  const sharedDescription = (
    <>
      <Text mb="4" fontSize="lg">
        This page will check your authenticated user&apos;s address for a
        particular NFT.
      </Text>
      <Text mb="6" fontSize="lg">
        This is checking for the{' '}
        <Link
          href="https://goerli.etherscan.io/token/0x982659f8ce3988096a735044ad42445d6514ba7e"
          color="teal.500"
          isExternal
        >
          CodeBushiToken (CBT)
        </Link>{' '}
        on the GOERLI Testnet. You can test this out by{' '}
        <NextLink href="/nft" passHref>
          <Link color="teal.500">Minting the NFT</Link>
        </NextLink>
        .
      </Text>
    </>
  )

  if (address) {
    return (
      <Layout>
        <Heading as="h1" mb="8">
          Unauthenticated
        </Heading>
        {sharedDescription}
        <Text fontSize="lg">Please connect a wallet</Text>
      </Layout>
    )
  }

  if (isError) {
    return (
      <Layout>
        <Heading as="h1" mb="8">
          Token Gated Page
        </Heading>
        {sharedDescription}
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>
            There was an error trying to fetch your NFT.
          </AlertDescription>
        </Alert>
      </Layout>
    )
  }

  if (!hasNft) {
    return (
      <Layout>
        <Heading as="h1" mb="8">
          Token Gated Page
        </Heading>
        {sharedDescription}
        <Text mb="4" fontSize="lg">
          Authenticated as <Code colorScheme="orange">{address}</Code>
        </Text>
        <Alert status="warning">
          <AlertIcon />
          <AlertTitle>Access Denied:</AlertTitle>
          <AlertDescription>You do not have the NFT.</AlertDescription>
        </Alert>
      </Layout>
    )
  }

  return (
    <Layout>
      <Heading as="h1" mb="8">
        Token Gated Page
      </Heading>
      {sharedDescription}
      <Text mb="4" fontSize="lg">
        Authenticated as: <Code colorScheme="orange">{address}</Code>
      </Text>
      <Alert status="success">
        <AlertIcon />
        <AlertTitle>Access Granted:</AlertTitle>
        <AlertDescription>You have the NFT!</AlertDescription>
      </Alert>
    </Layout>
  )
}

export default TokenGated
