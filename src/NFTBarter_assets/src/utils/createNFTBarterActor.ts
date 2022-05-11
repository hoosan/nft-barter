// @ts-ignore
import { idlFactory } from '../../declarations/NFTBarter/NFTBarter.did.js';

import { _SERVICE as INFTBarter } from '../../../declarations/NFTBarter/NFTBarter.did.js';
import { curriedCreateActor } from '../../../NFTBarter_assets/src/utils/createActor';
import localCanisterIds from '../../../../.dfx/local/canister_ids.json';

const canisterId = localCanisterIds.NFTBarter.local;

export const createNFTBarterActor =
  curriedCreateActor<INFTBarter>(idlFactory)(canisterId);
