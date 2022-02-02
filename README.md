# omnidsubgraph

A subgraph for Omnid.

Http Queries Endpoint:
- https://api.thegraph.com/subgraphs/id/QmNfWEZgbBtZLJRSNL5i7voH2LEcRYLXkoFi8Dt5ToC8KQ
-  https://api.thegraph.com/subgraphs/name/anudit/omnid

Deployed to https://thegraph.com/explorer/subgraph/anudit/omnid

Example,
```graphql
{
  omnids(where: {id: "0xaf201a444e7d50ebadc5e592ad3cb862fe77d64b"}) {
    id
    tokenId
    score
    skinIndex
    etching
    refreshTime
    lastUpkeep
    tokenURI
  }
}
```
