import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { AutoColumn } from 'components/Column'
import { TYPE } from 'theme'
import { ResponsiveRow, RowBetween, RowFixed } from 'components/Row'
import LineChart from 'components/LineChart/alt'
import useTheme from 'hooks/useTheme'
import { useProtocolChartData, useProtocolData, useProtocolTransactions } from 'state/protocol/hooks'
import { DarkGreyCard } from 'components/Card'
import { formatDollarAmount } from 'utils/numbers'
import Percent from 'components/Percent'
import { HideMedium, HideSmall, StyledInternalLink } from '../../theme/components'
import TokenTable from 'components/tokens/TokenTable'
import PoolTable from 'components/pools/PoolTable'
import { PageWrapper, ThemedBackgroundGlobal } from 'pages/styled'
import { unixToDate } from 'utils/date'
import BarChart from 'components/BarChart/alt'
import { useAllPoolData } from 'state/pools/hooks'
import { notEmpty } from 'utils'
import TransactionsTable from '../../components/TransactionsTable'
import { useAllTokenData } from 'state/tokens/hooks'
import { MonoSpace } from 'components/shared'
import { useActiveNetworkVersion } from 'state/application/hooks'
import { useTransformedVolumeData } from 'hooks/chart'
import { SmallOptionButton } from 'components/Button'
import { VolumeWindow } from 'types'
import { SupportedNetwork } from 'constants/networks'

const ChartWrapper = styled.div`
  width: 49%;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
  `};
`

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const theme = useTheme()

  const [activeNetwork] = useActiveNetworkVersion()
  const isOmnichain = activeNetwork.id === SupportedNetwork.OMNICHAIN

  const [protocolData] = useProtocolData()
  const [transactions] = useProtocolTransactions()

  const [volumeHover, setVolumeHover] = useState<number | undefined>()
  const [liquidityHover, setLiquidityHover] = useState<number | undefined>()
  const [leftLabel, setLeftLabel] = useState<string | undefined>()
  const [rightLabel, setRightLabel] = useState<string | undefined>()

  // Hot fix to remove errors in TVL data while subgraph syncs.
  const [chartData] = useProtocolChartData()

  useEffect(() => {
    setLiquidityHover(undefined)
    setVolumeHover(undefined)
  }, [activeNetwork])

  // get all the pool datas that exist
  const allPoolData = useAllPoolData()
  const poolDatas = useMemo(() => {
    return Object.values(allPoolData)
      .map((p) => p.data)
      .filter(notEmpty)
  }, [allPoolData])

  const volumeAndTvlOmnichainLast24H = useMemo(() => {
    if (chartData) {
      const filteredData = chartData.filter((day) => day.date > Date.now() / 1000 - 24 * 60 * 60)

      const summedData = filteredData.reduce(
        (acc, day) => ({
          volumeSum: acc.volumeSum + day.volumeUSD,
          tvlSum: acc.tvlSum + day.tvlUSD,
        }),
        { volumeSum: 0, tvlSum: 0 }
      )

      return summedData
    }

    return { volumeSum: undefined, tvlSum: undefined }
  }, [chartData])

  // if hover value undefined, reset to current day value
  useEffect(() => {
    if (volumeHover === undefined && (protocolData || volumeAndTvlOmnichainLast24H.volumeSum)) {
      setVolumeHover(protocolData?.volumeUSD || volumeAndTvlOmnichainLast24H.volumeSum)
    }
  }, [protocolData, volumeHover])

  useEffect(() => {
    if (liquidityHover === undefined && (protocolData || volumeAndTvlOmnichainLast24H.tvlSum)) {
      setLiquidityHover(protocolData?.tvlUSD || volumeAndTvlOmnichainLast24H.tvlSum)
    }
  }, [liquidityHover, protocolData])

  const formattedTvlData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: unixToDate(day.date),
          value: day.tvlUSD,
        }
      })
    } else {
      return []
    }
  }, [chartData])

  const formattedVolumeData = useMemo(() => {
    if (chartData) {
      return chartData.map((day) => {
        return {
          time: unixToDate(day.date),
          value: day.volumeUSD,
        }
      })
    } else {
      return []
    }
  }, [chartData])

  const weeklyVolumeData = useTransformedVolumeData(chartData, 'week')
  const monthlyVolumeData = useTransformedVolumeData(chartData, 'month')

  const allTokens = useAllTokenData()

  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((t) => t.data)
      .filter(notEmpty)
  }, [allTokens])

  const [volumeWindow, setVolumeWindow] = useState(VolumeWindow.weekly)

  const tvlValue = useMemo(() => {
    if (liquidityHover) {
      return formatDollarAmount(liquidityHover || volumeAndTvlOmnichainLast24H.tvlSum, 2, true)
    }
    return formatDollarAmount(protocolData?.tvlUSD || volumeAndTvlOmnichainLast24H.tvlSum, 2, true)
  }, [liquidityHover, protocolData?.tvlUSD, volumeAndTvlOmnichainLast24H.tvlSum])

  return (
    <PageWrapper>
      <ThemedBackgroundGlobal backgroundColor={activeNetwork.bgColor} />
      <AutoColumn gap="16px">
        <TYPE.main>Solidly Overview</TYPE.main>
        <ResponsiveRow>
          <ChartWrapper>
            <LineChart
              data={formattedTvlData}
              height={220}
              minHeight={332}
              color={activeNetwork.primaryColor}
              value={liquidityHover}
              label={leftLabel}
              setValue={setLiquidityHover}
              setLabel={setLeftLabel}
              topLeft={
                <AutoColumn gap="4px">
                  <TYPE.mediumHeader fontSize="16px">TVL</TYPE.mediumHeader>
                  <TYPE.largeHeader fontSize="32px">
                    <MonoSpace>{tvlValue} </MonoSpace>
                  </TYPE.largeHeader>
                  <TYPE.main fontSize="12px" height="14px">
                    {leftLabel ? <MonoSpace>{leftLabel} (UTC)</MonoSpace> : null}
                  </TYPE.main>
                </AutoColumn>
              }
            />
          </ChartWrapper>
          <ChartWrapper>
            <BarChart
              height={220}
              minHeight={332}
              data={
                volumeWindow === VolumeWindow.monthly
                  ? monthlyVolumeData
                  : volumeWindow === VolumeWindow.weekly
                  ? weeklyVolumeData
                  : formattedVolumeData
              }
              color={theme.blue1}
              setValue={setVolumeHover}
              setLabel={setRightLabel}
              value={volumeHover}
              label={rightLabel}
              activeWindow={volumeWindow}
              topRight={
                <RowFixed style={{ marginLeft: '-40px', marginTop: '8px' }}>
                  <SmallOptionButton
                    active={volumeWindow === VolumeWindow.daily}
                    onClick={() => setVolumeWindow(VolumeWindow.daily)}
                  >
                    D
                  </SmallOptionButton>
                  <SmallOptionButton
                    active={volumeWindow === VolumeWindow.weekly}
                    style={{ marginLeft: '8px' }}
                    onClick={() => setVolumeWindow(VolumeWindow.weekly)}
                  >
                    W
                  </SmallOptionButton>
                  <SmallOptionButton
                    active={volumeWindow === VolumeWindow.monthly}
                    style={{ marginLeft: '8px' }}
                    onClick={() => setVolumeWindow(VolumeWindow.monthly)}
                  >
                    M
                  </SmallOptionButton>
                </RowFixed>
              }
              topLeft={
                <AutoColumn gap="4px">
                  <TYPE.mediumHeader fontSize="16px">Volume 24H</TYPE.mediumHeader>
                  <TYPE.largeHeader fontSize="32px">
                    <MonoSpace> {formatDollarAmount(volumeHover, 2)}</MonoSpace>
                  </TYPE.largeHeader>
                  <TYPE.main fontSize="12px" height="14px">
                    {rightLabel ? <MonoSpace>{rightLabel} (UTC)</MonoSpace> : null}
                  </TYPE.main>
                </AutoColumn>
              }
            />
          </ChartWrapper>
        </ResponsiveRow>
        <HideSmall>
          <DarkGreyCard>
            <RowBetween>
              <RowFixed>
                <RowFixed mr="20px">
                  <TYPE.main mr="4px">Volume 24H: </TYPE.main>
                  <TYPE.label mr="4px">
                    {formatDollarAmount(isOmnichain ? volumeAndTvlOmnichainLast24H.volumeSum : protocolData?.volumeUSD)}
                  </TYPE.label>
                  {!isOmnichain && (
                    <Percent
                      value={isOmnichain ? volumeAndTvlOmnichainLast24H.volumeSum : protocolData?.volumeUSDChange}
                      wrap={true}
                    />
                  )}
                </RowFixed>
                {!isOmnichain && (
                  <RowFixed mr="20px">
                    <TYPE.main mr="4px">Fees 24H: </TYPE.main>
                    <TYPE.label mr="4px">
                      {formatDollarAmount(isOmnichain ? volumeAndTvlOmnichainLast24H.volumeSum : protocolData?.feesUSD)}
                    </TYPE.label>
                    <Percent
                      value={
                        // isOmnichain
                        //   ? volumeAndTvlOmnichainLast24H.feeChain
                        //   :
                        protocolData?.feeChange
                      }
                      wrap={true}
                    />
                  </RowFixed>
                )}
                <HideMedium>
                  <RowFixed mr="20px">
                    <TYPE.main mr="4px">TVL: </TYPE.main>
                    <TYPE.label mr="4px">
                      {formatDollarAmount(isOmnichain ? volumeAndTvlOmnichainLast24H.tvlSum : protocolData?.tvlUSD)}
                    </TYPE.label>
                    <TYPE.main></TYPE.main>
                    {!isOmnichain && (
                      <Percent
                        value={
                          // isOmnichain
                          //   ? volumeAndTvlOmnichainLast24H.tvlUSDChange
                          //   :
                          protocolData?.tvlUSDChange
                        }
                        wrap={true}
                      />
                    )}
                  </RowFixed>
                </HideMedium>
              </RowFixed>
            </RowBetween>
          </DarkGreyCard>
        </HideSmall>
        {!isOmnichain && (
          <>
            <RowBetween>
              <TYPE.main>Top Tokens</TYPE.main>
              <StyledInternalLink to="tokens">Explore</StyledInternalLink>
            </RowBetween>

            <TokenTable tokenDatas={formattedTokens} />
            <RowBetween>
              <TYPE.main>Top Pools</TYPE.main>
              <StyledInternalLink to="pools">Explore</StyledInternalLink>
            </RowBetween>
            <PoolTable poolDatas={poolDatas} />
            <RowBetween>
              <TYPE.main>Transactions</TYPE.main>
            </RowBetween>
            {transactions ? <TransactionsTable transactions={transactions} color={activeNetwork.primaryColor} /> : null}
          </>
        )}
      </AutoColumn>
    </PageWrapper>
  )
}
