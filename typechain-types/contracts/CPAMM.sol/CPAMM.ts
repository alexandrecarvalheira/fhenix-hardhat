/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";

export type InEuint32Struct = { data: BytesLike };

export type InEuint32StructOutput = [data: string] & { data: string };

export interface CPAMMInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addLiquidity"
      | "balanceOf"
      | "eip712Domain"
      | "removeLiquidity"
      | "reserve0"
      | "reserve1"
      | "swap"
      | "token0"
      | "token1"
      | "totalSupply"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "EIP712DomainChanged"): EventFragment;

  encodeFunctionData(
    functionFragment: "addLiquidity",
    values: [InEuint32Struct, InEuint32Struct]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "eip712Domain",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeLiquidity",
    values: [InEuint32Struct]
  ): string;
  encodeFunctionData(functionFragment: "reserve0", values?: undefined): string;
  encodeFunctionData(functionFragment: "reserve1", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [AddressLike, InEuint32Struct]
  ): string;
  encodeFunctionData(functionFragment: "token0", values?: undefined): string;
  encodeFunctionData(functionFragment: "token1", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "addLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "eip712Domain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "reserve0", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "reserve1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token0", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token1", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
}

export namespace EIP712DomainChangedEvent {
  export type InputTuple = [];
  export type OutputTuple = [];
  export interface OutputObject {}
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface CPAMM extends BaseContract {
  connect(runner?: ContractRunner | null): CPAMM;
  waitForDeployment(): Promise<this>;

  interface: CPAMMInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addLiquidity: TypedContractMethod<
    [_amount0: InEuint32Struct, _amount1: InEuint32Struct],
    [bigint],
    "nonpayable"
  >;

  balanceOf: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  eip712Domain: TypedContractMethod<
    [],
    [
      [string, string, string, bigint, string, string, bigint[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: bigint;
        verifyingContract: string;
        salt: string;
        extensions: bigint[];
      }
    ],
    "view"
  >;

  removeLiquidity: TypedContractMethod<
    [_shares: InEuint32Struct],
    [[bigint, bigint] & { amount0: bigint; amount1: bigint }],
    "nonpayable"
  >;

  reserve0: TypedContractMethod<[], [bigint], "view">;

  reserve1: TypedContractMethod<[], [bigint], "view">;

  swap: TypedContractMethod<
    [_tokenIn: AddressLike, _amountIn: InEuint32Struct],
    [bigint],
    "nonpayable"
  >;

  token0: TypedContractMethod<[], [string], "view">;

  token1: TypedContractMethod<[], [string], "view">;

  totalSupply: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addLiquidity"
  ): TypedContractMethod<
    [_amount0: InEuint32Struct, _amount1: InEuint32Struct],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "balanceOf"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "eip712Domain"
  ): TypedContractMethod<
    [],
    [
      [string, string, string, bigint, string, string, bigint[]] & {
        fields: string;
        name: string;
        version: string;
        chainId: bigint;
        verifyingContract: string;
        salt: string;
        extensions: bigint[];
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "removeLiquidity"
  ): TypedContractMethod<
    [_shares: InEuint32Struct],
    [[bigint, bigint] & { amount0: bigint; amount1: bigint }],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "reserve0"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "reserve1"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "swap"
  ): TypedContractMethod<
    [_tokenIn: AddressLike, _amountIn: InEuint32Struct],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "token0"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "token1"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "totalSupply"
  ): TypedContractMethod<[], [bigint], "view">;

  getEvent(
    key: "EIP712DomainChanged"
  ): TypedContractEvent<
    EIP712DomainChangedEvent.InputTuple,
    EIP712DomainChangedEvent.OutputTuple,
    EIP712DomainChangedEvent.OutputObject
  >;

  filters: {
    "EIP712DomainChanged()": TypedContractEvent<
      EIP712DomainChangedEvent.InputTuple,
      EIP712DomainChangedEvent.OutputTuple,
      EIP712DomainChangedEvent.OutputObject
    >;
    EIP712DomainChanged: TypedContractEvent<
      EIP712DomainChangedEvent.InputTuple,
      EIP712DomainChangedEvent.OutputTuple,
      EIP712DomainChangedEvent.OutputObject
    >;
  };
}
