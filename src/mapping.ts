import { BigInt, json } from "@graphprotocol/graph-ts"
import {
  Omnid as OmnidContract,
  EtchingUpdated,
  ScoreUpdated,
  SkinUpdated,
  Transfer
} from "../generated/Omnid/Omnid"
import { Omnid } from "../generated/schema"


export function handleEtchingUpdated(event: EtchingUpdated): void {
  let entity = Omnid.load(event.params.who.toHexString());
  if (!entity) {
    entity = new Omnid(event.params.who.toHexString());
    entity.etching = event.params.etching.toString();
    const contract = OmnidContract.bind(event.address);
    entity.tokenURI = contract.tokenURI(event.params.tokenId);
    entity.save();
  }
}

export function handleScoreUpdated(event: ScoreUpdated): void {
  let entity = Omnid.load(event.params.who.toHexString());
  if (!entity) {
    entity = new Omnid(event.params.who.toHexString());
    entity.score = event.params.score;
    entity.refreshTime = event.block.timestamp;
    entity.save();
  }
}

export function handleSkinUpdated(event: SkinUpdated): void {
  let entity = Omnid.load(event.params.who.toHexString());
  if (!entity) {
    entity = new Omnid(event.params.who.toHexString());
    entity.skinIndex = event.params.skinId;
    const contract = OmnidContract.bind(event.address);
    entity.tokenURI = contract.tokenURI(event.params.tokenId);

    entity.save();
  }
}

export function handleTransfer(event: Transfer): void {
  let entity = Omnid.load(event.params.to.toHexString());
  if (!entity) {
    entity = new Omnid(event.params.to.toHexString());
  }

  const contract = OmnidContract.bind(event.address);
  const deets = contract.getIdDetails(event.params.to);

  entity.score = deets.value0;
  entity.refreshTime = deets.value1;
  entity.skinIndex = deets.value2;
  entity.etching = deets.value3.toString();
  entity.lastUpkeep = BigInt.fromI32(0);
  entity.tokenId = event.params.tokenId;
  entity.tokenURI = contract.tokenURI(event.params.tokenId);

  entity.save()

}
