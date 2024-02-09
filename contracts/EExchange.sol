// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity >=0.8.13 <0.9.0;

import "@fhenixprotocol/contracts/FHE.sol";
import "@fhenixprotocol/contracts/access/Permissioned.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
import {FHE, euint32, inEuint8} from "@fhenixprotocol/contracts/FHE.sol";


contract EExchange is Permissioned {
    IERC20 public immutable token0;
    IERC20 public immutable token1;

    euint8 public reserve0;
    euint8 public reserve1;

    euint8 public totalSupply;
    mapping(address => euint8) public balanceOf;

    constructor(address _token0, address _token1) {
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);
    }

    function _mint(address _to, euint8 _amount) private {
        balanceOf[_to] = FHE.add(balanceOf[_to], _amount);
        totalSupply = totalSupply.add(_amount);
    }

        function balances(
        Permission calldata permission
    ) public view virtual onlySender(permission) returns (bytes memory) {
            return FHE.sealoutput(balanceOf[msg.sender], permission.publicKey);
    }

//test func
     function getTotalSupply() public view virtual returns (uint8) {
        return  FHE.decrypt(totalSupply);
     }

    function _burn(address _from, euint8 _amount) private {
        balanceOf[_from] = FHE.sub(balanceOf[_from],_amount);
        totalSupply = totalSupply.sub(_amount);
    }

    function _update(euint8 _reserve0, euint8 _reserve1) private {
        reserve0 = _reserve0;
        reserve1 = _reserve1;
    }

    function swap(address _tokenIn, inEuint8 calldata _amountIn) external returns (euint8 amountOut) {
        require(
            _tokenIn == address(token0) || _tokenIn == address(token1),
            "invalid token"
        );
        FHE.req(FHE.ne(FHE.asEuint8(_amountIn), FHE.asEuint8(0)));

        bool isToken0 = _tokenIn == address(token0);
        (IERC20 tokenIn, IERC20 tokenOut, euint8 reserveIn, euint8 reserveOut) = isToken0
            ? (token0, token1, reserve0, reserve1)
            : (token1, token0, reserve1, reserve0);

        
        tokenIn.transferFrom(msg.sender, address(this), _amountIn);


        // euint8 amountInWithFee = FHE.div(FHE.mul(FHE.asEuint8(_amountIn),FHE.asEuint8(997)),FHE.asEuint8(1000));
        // amountOut = FHE.div(FHE.mul(reserveOut,amountInWithFee),FHE.add(reserveIn,amountInWithFee));
        amountOut = FHE.div(reserveOut,reserveIn);

        tokenOut.transfer(msg.sender, amountOut);

        _update(token0.balanceOf(), token1.balanceOf());
    }

    function addLiquidity(inEuint8 calldata _amount0,inEuint8 calldata _amount1) external returns (euint8 shares) {
        euint8 amount0 = FHE.asEuint8(_amount0);
        euint8 amount1 = FHE.asEuint8(_amount1);

        ebool isNotZero = FHE.or(reserve0.ne(FHE.asEuint8(0)), reserve1.ne(FHE.asEuint8(0)));
        ebool req = FHE.select(isNotZero,FHE.eq(FHE.mul(reserve0, amount1),FHE.mul(reserve1, amount0)), FHE.asEbool(true));
        FHE.req(req);
         
        // ebool reservesEqual = FHE.eq(FHE.mul(reserve0, amount1),FHE.mul(reserve1, amount0));
        // FHE.req(reservesEqual);

        token0.transferFrom(msg.sender, address(this), _amount0);
        token1.transferFrom(msg.sender, address(this), _amount1);


        shares = FHE.select(totalSupply.eq(FHE.asEuint8(0)),
        FHE.asEuint8(_sqrt(FHE.add(amount0, amount1))),
        _min(FHE.mul(amount0,totalSupply),FHE.mul(amount1,totalSupply)));


        FHE.req(shares.ne(FHE.asEuint8(0)));
        _mint(msg.sender, shares);

        _update(token0.balanceOf(), token1.balanceOf());
        return shares;
    }

    function removeLiquidity(
        inEuint8 calldata _shares
    ) external returns (euint8 amount0, euint8 amount1) {
        euint8 shares = FHE.asEuint8(_shares); 
        euint8 bal0 = token0.balanceOf();
        euint8 bal1 = token1.balanceOf();

        amount0 = FHE.div(shares.mul(bal0),totalSupply);
        amount1 = FHE.div(shares.mul(bal1),totalSupply);

        FHE.req(FHE.and(amount0.ne(FHE.asEuint8(0)), amount0.ne(FHE.asEuint8(0))));

        _burn(msg.sender, shares);
        _update(bal0.sub(amount0),bal1.sub(amount1));

        token0.transfer(msg.sender, amount0);
        token1.transfer(msg.sender, amount1);
    }

    function _sqrt(euint8 _y) private pure returns (uint8 z) {
        uint8 y = FHE.decrypt(_y);
        if (y > 3) {
            z = y;
            uint8 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

    function _min(euint8 _x,euint8 _y) private view returns (euint8) {
        euint8 x = _x.div(reserve0);
        euint8 y = _y.div(reserve1);

        ebool result = x.lte(y);
        return FHE.select(result,x,y);
    }
}

interface IERC20 {
    function totalSupply() external view returns (uint8);

    function balanceOf() external view returns (euint8);

    function transfer(address to, euint8 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint8);

    function approve(address spender, inEuint8 calldata encryptedAmount) external returns (bool);

    function transferFrom(address from, address to, inEuint8 calldata encryptedAmount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint8 amount);
    event Approval(address indexed owner, address indexed spender, uint8 amount);
}