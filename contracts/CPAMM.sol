// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity >=0.8.13 <0.9.0;

import "@fhenixprotocol/contracts/FHE.sol";
import "@fhenixprotocol/contracts/access/Permissioned.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import {FHE, euint32, inEuint8} from "@fhenixprotocol/contracts/FHE.sol";


contract CPAMM is Permissioned {
    IERC20 public immutable token0;
    IERC20 public immutable token1;

    euint32 public reserve0;
    euint32 public reserve1;

    euint32 public totalSupply;
    mapping(address => euint32) public balanceOf;

    constructor(address _token0, address _token1) {
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);
    }

    function _mint(address _to, euint32 _amount) private {
        balanceOf[_to] = FHE.add(balanceOf[_to], _amount);
        totalSupply = totalSupply.add(_amount);
    }

        function balances(
        Permission calldata permission
    ) public view virtual onlySender(permission) returns (bytes memory) {
            return FHE.sealoutput(balanceOf[msg.sender], permission.publicKey);
    }

     function getTotalSupply() public view virtual returns (uint32) {
        return  FHE.decrypt(totalSupply);
     }

    function _burn(address _from, euint32 _amount) private {
        balanceOf[_from] = FHE.sub(balanceOf[_from],_amount);
        totalSupply = totalSupply.sub(_amount);
    }

    function _update(euint32 _reserve0, euint32 _reserve1) private {
        reserve0 = _reserve0;
        reserve1 = _reserve1;
    }

    function swap(address _tokenIn, inEuint32 calldata _amountIn) external returns (euint32 amountOut) {
        require(
            _tokenIn == address(token0) || _tokenIn == address(token1),
            "invalid token"
        );
        FHE.req(FHE.gt(FHE.asEuint32(_amountIn), FHE.asEuint32(0)));

        bool isToken0 = _tokenIn == address(token0);
        (IERC20 tokenIn, IERC20 tokenOut, euint32 reserveIn, euint32 reserveOut) = isToken0
            ? (token0, token1, reserve0, reserve1)
            : (token1, token0, reserve1, reserve0);

        tokenIn.transferFrom(msg.sender, address(this), _amountIn);


        euint32 amountInWithFee = FHE.div(FHE.mul(FHE.asEuint32(_amountIn),FHE.asEuint32(997)),FHE.asEuint32(1000));
        amountOut = FHE.div(FHE.mul(reserveOut,amountInWithFee),FHE.add(reserveIn,amountInWithFee));

        tokenOut.transfer(msg.sender, amountOut);

        _update(token0.balanceOf(), token1.balanceOf());
    }

    function addLiquidity(inEuint32 calldata _amount0,inEuint32 calldata _amount1) external returns (euint32 shares) {
        euint32 amount0 = FHE.asEuint32(_amount0);
        euint32 amount1 = FHE.asEuint32(_amount1);


         
        ebool reservesEqual = FHE.eq(FHE.mul(reserve0, amount1),FHE.mul(reserve1, amount0));
        FHE.req(reservesEqual);

        token0.transferFrom(msg.sender, address(this), _amount0);
        token1.transferFrom(msg.sender, address(this), _amount1);S


        euint32 shares = FHE.select(totalSupply.eq(FHE.asEuint32(0)),
        FHE.asEuint32(_sqrt(FHE.add(amount0, amount1))),
        FHE.div(FHE.mul(amount0,totalSupply),reserve0));


        FHE.req(shares.ne(FHE.asEuint32(0)));
        _mint(msg.sender, shares);

        _update(token0.balanceOf(), token1.balanceOf());
        return shares;
    }

    function removeLiquidity(
        inEuint32 calldata _shares
    ) external returns (euint32 amount0, euint32 amount1) {
        euint32 _shares = FHE.asEuint32(_shares); 
        euint32 bal0 = token0.balanceOf();
        euint32 bal1 = token1.balanceOf();

        amount0 = (_shares.mul(bal0)).div(totalSupply);
        amount1 = (_shares.mul(bal1)).div(totalSupply);

        FHE.req(FHE.and(amount0.gt(FHE.asEuint32(0)), amount0.gt(FHE.asEuint32(0))));

        _burn(msg.sender, _shares);
        _update(bal0.sub( amount0),bal1.sub(amount1));

        token0.transfer(msg.sender, amount0);
        token1.transfer(msg.sender, amount1);
    }

    function _sqrt(euint32 _y) private pure returns (uint32 z) {
        uint32 y = FHE.decrypt(_y);
        if (y > 3) {
            z = y;
            uint32 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

    function _min(euint32 _x,euint32 _y) private view returns (euint32) {
        euint32 x = _x.div(reserve0);
        euint32 y = _y.div(reserve1);

        ebool result = x.lte(y);
        return FHE.select(result,x,y);
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint32);

    function balanceOf() external view returns (euint32);

    function transfer(address to, euint32 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint32);

    function approve(address spender, inEuint32 calldata encryptedAmount) external returns (bool);

    function transferFrom(address from, address to, inEuint32 calldata encryptedAmount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint32 amount);
    event Approval(address indexed owner, address indexed spender, uint32 amount);
}