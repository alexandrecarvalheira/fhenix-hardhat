// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity >=0.8.13 <0.9.0;

import "@fhenixprotocol/contracts/FHE.sol";
import "@fhenixprotocol/contracts/access/Permissioned.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import {FHE, euint16, inEuint16} from "@fhenixprotocol/contracts/FHE.sol";
import "./EncryptedERC20.sol";


contract EExchange is Permissioned {
    EncryptedERC20 public immutable token0;
    EncryptedERC20 public immutable token1;

    euint16 internal reserve0;
    euint16 internal reserve1;

    euint16 internal totalSupply;
    mapping(address => euint16) internal balance;

    constructor(address _token0, address _token1) {
        token0 = EncryptedERC20(_token0);
        token1 = EncryptedERC20(_token1);
    }

    function _mint(address _to, euint16 _amount) private {
        balance[_to] = FHE.add(balance[_to], _amount);
        totalSupply = totalSupply.add(_amount);
    }

        function balanceOf(
        Permission calldata permission
    ) public view virtual onlySender(permission) returns (bytes memory) {
            return FHE.sealoutput(balance[msg.sender], permission.publicKey);
    }

//test func
     function getTotalSupply() public view virtual returns (uint16) {
        return  FHE.decrypt(totalSupply);
     }

    function _burn(address _from, euint16 _amount) private {
        balance[_from] = FHE.sub(balance[_from],_amount);
        totalSupply = totalSupply.sub(_amount);
    }

    function _update(euint16 _reserve0, euint16 _reserve1) private {
        reserve0 = _reserve0;
        reserve1 = _reserve1;
    }

    function swap(address _tokenIn, inEuint16 calldata _amountIn) external returns (euint16 amountOut) {
        require(
            _tokenIn == address(token0) || _tokenIn == address(token1),
            "invalid token"
        );
        // FHE.req(FHE.ne(FHE.asEuint16(_amountIn), FHE.asEuint16(0)));

        bool isToken0 = _tokenIn == address(token0);
        (EncryptedERC20 tokenIn, EncryptedERC20 tokenOut, euint16 reserveIn, euint16 reserveOut) = isToken0
            ? (token0, token1, reserve0, reserve1)
            : (token1, token0, reserve1, reserve0);

        
        tokenIn.transferFrom(msg.sender, address(this), _amountIn);


        // euint16 amountInWithFee = FHE.div(FHE.mul(FHE.asEuint16(_amountIn),FHE.asEuint16(997)),FHE.asEuint16(1000));
        // amountOut = FHE.div(FHE.mul(reserveOut,amountInWithFee),FHE.add(reserveIn,amountInWithFee));
        amountOut = FHE.div(reserveOut.mul(FHE.asEuint16(_amountIn)),reserveIn.add(FHE.asEuint16(_amountIn)));

        tokenOut.transfer(msg.sender, amountOut);

        _update(token0.balanceOf(), token1.balanceOf());
    }

    function addLiquidity(inEuint16 calldata _amount0,inEuint16 calldata _amount1) external returns (euint16 shares) {
        euint16 amount0 = FHE.asEuint16(_amount0);
        euint16 amount1 = FHE.asEuint16(_amount1);

        // ebool isNotZero = FHE.or(reserve0.ne(FHE.asEuint16(0)), reserve1.ne(FHE.asEuint16(0)));
        // ebool req = FHE.select(isNotZero,FHE.eq(FHE.mul(reserve0, amount1),FHE.mul(reserve1, amount0)), FHE.asEbool(true));
        // FHE.req(req);
         
        // ebool reservesEqual = FHE.eq(FHE.mul(reserve0, amount1),FHE.mul(reserve1, amount0));
        // FHE.req(reservesEqual);

        token0.transferFrom(msg.sender, address(this), _amount0);
        token1.transferFrom(msg.sender, address(this), _amount1);


        shares = FHE.select(totalSupply.eq(FHE.asEuint16(0)),
        FHE.asEuint16(_sqrt(FHE.add(amount0, amount1))),
        _min(FHE.mul(amount0,totalSupply),FHE.mul(amount1,totalSupply)));


        // FHE.req(shares.ne(FHE.asEuint16(0)));
        _mint(msg.sender, shares);

        _update(token0.balanceOf(), token1.balanceOf());
        return shares;
    }

    function removeLiquidity(
        inEuint16 calldata _shares
    ) external returns (euint16 amount0, euint16 amount1) {
        euint16 shares = FHE.asEuint16(_shares); 
        euint16 bal0 = token0.balanceOf();
        euint16 bal1 = token1.balanceOf();

        amount0 = FHE.div(shares.mul(bal0),totalSupply);
        amount1 = FHE.div(shares.mul(bal1),totalSupply);

        // FHE.req(FHE.and(amount0.ne(FHE.asEuint16(0)), amount1.ne(FHE.asEuint16(0))));

        _burn(msg.sender, shares);
        _update(bal0.sub(amount0),bal1.sub(amount1));

        token0.transfer(msg.sender, amount0);
        token1.transfer(msg.sender, amount1);
    }

    function _sqrt(euint16 _y) private pure returns (uint16 z) {
        uint16 y = FHE.decrypt(_y);
        if (y > 3) {
            z = y;
            uint16 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

    function _min(euint16 _x,euint16 _y) private view returns (euint16) {
        euint16 x = _x.div(reserve0);
        euint16 y = _y.div(reserve1);

        ebool result = x.lte(y);
        return FHE.select(result,x,y);
    }
}

