import { IDL } from '@dfinity/candid';

declare module '../../../declarations/NFTBarter/NFTBarter.did.js' {
  function idlFactory(): IDL.ServiceClass;
}
import {
  NFTBarter,
  idlFactory,
} from '../../../declarations/NFTBarter/NFTBarter.did.js';
import { curriedCreateActor } from '../../../NFTBarter_assets/src/utils/createActor';
import localCanisterIds from '../../../../.dfx/local/canister_ids.json';

const canisterId = localCanisterIds.NFTBarter.local;

export const createNFTBarterActor =
  curriedCreateActor<NFTBarter>(idlFactory)(canisterId);
