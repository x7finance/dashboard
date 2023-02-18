// SPDX-License-Identifier: MIT

pragma solidity =0.8.18;

abstract contract Ownable {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor(address owner_) {
        _transferOwnership(owner_);
    }

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function _checkOwner() internal view virtual {
        require(owner() == msg.sender, "Ownable: caller is not the owner");
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

interface IUniswapV2Factory {
    function allPairs(uint) external view returns (address pair);

    function allPairsLength() external view returns (uint);
}

interface IUniswapV2Pair {
    function token0() external view returns (address);

    function token1() external view returns (address);

    function getReserves()
        external
        view
        returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
}

interface IERC20 {
    function totalSupply() external view returns (uint256);
}

interface IERC20Metadata is IERC20 {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);
}

interface IX7LendingPoolV1 {
    function getPremiumsDue(
        uint256 loanID,
        uint256 asOf
    ) external view returns (uint256);

    function getPremiumPaymentSchedule(
        uint256 loanID
    ) external view returns (uint256[] memory, uint256[] memory);

    function getPrincipalDue(
        uint256 loanID,
        uint256 asOf
    ) external view returns (uint256);

    function getPrincipalPaymentSchedule(
        uint256 loanID
    ) external view returns (uint256[] memory, uint256[] memory);

    function getRemainingLiability(
        uint256 loanID
    ) external view returns (uint256);

    function getTotalDue(
        uint256 loanID,
        uint256 asOf
    ) external view returns (uint256);

    function loanPair(uint) external view returns (address);

    function loanTermActive(address) external view returns (bool);

    function loanTermLookup(uint256) external view returns (address);

    function loanToken(uint256) external view returns (address);

    function nextLoanID() external view returns (uint256);
}

contract X7FactoryPairs is Ownable {
    struct PairData {
        address pairAddress;
        address token0Address;
        address token1Address;
        uint112 reserve0;
        uint112 reserve1;
        uint32 blockTimestampLast;
        uint256 token0Supply;
        uint256 token1Supply;
        string token0Name;
        string token0Symbol;
        uint8 token0Decimals;
        string token1Name;
        string token1Symbol;
        uint8 token1Decimals;
        uint256 loanID;
        LoanData loanData;
    }

    struct LoanData {
        uint256 premiumsDue;
        uint256[] premiumPaymentScheduledueDates;
        uint256[] premiumPaymentSchedulepaymentAmounts;
        uint256 principalDue;
        uint256[] principalPaymentScheduledueDates;
        uint256[] principalPaymentSchedulepaymentAmounts;
        uint256 totalDue;
        bool loanTermActive;
        address loanTermLookup;
        address loanToken;
        uint256 remainingLiability;
    }

    address public lendingPoolAddress;
    event LendingPoolAddressSet(address oldAddress, address newAddress);

    constructor(address _lendingPoolAddress) Ownable(msg.sender) {
        lendingPoolAddress = _lendingPoolAddress;
    }

    function setLendingPoolAddress(
        address _lendingPoolAddress
    ) external onlyOwner {
        require(address(_lendingPoolAddress) != lendingPoolAddress);
        address oldAddress = address(lendingPoolAddress);
        lendingPoolAddress = address(_lendingPoolAddress);
        emit LendingPoolAddressSet(oldAddress, lendingPoolAddress);
    }

    function getPairData(
        address _pairAddress
    ) internal view returns (PairData memory) {
        IUniswapV2Pair pair = IUniswapV2Pair(_pairAddress);
        IERC20Metadata token0 = IERC20Metadata(pair.token0());
        IERC20Metadata token1 = IERC20Metadata(pair.token1());

        PairData memory pairData;
        pairData.pairAddress = _pairAddress;
        pairData.token0Address = pair.token0();
        pairData.token1Address = pair.token1();
        (
            pairData.reserve0,
            pairData.reserve1,
            pairData.blockTimestampLast
        ) = pair.getReserves();
        pairData.token0Supply = token0.totalSupply();
        pairData.token1Supply = token1.totalSupply();
        pairData.token0Name = token0.name();
        pairData.token0Symbol = token0.symbol();
        pairData.token0Decimals = token0.decimals();
        pairData.token1Name = token1.name();
        pairData.token1Symbol = token1.symbol();
        pairData.token1Decimals = token1.decimals();

        //There might not be a loan which -1 is returned
        int256 loanID = getLoanID(_pairAddress);

        if (loanID >= 0) {
            pairData.loanID = uint256(loanID);
            IX7LendingPoolV1 X7LendingPoolV1 = IX7LendingPoolV1(
                lendingPoolAddress
            );

            pairData.loanData.premiumsDue = X7LendingPoolV1.getPremiumsDue(
                pairData.loanID,
                block.timestamp
            );

            (
                pairData.loanData.premiumPaymentScheduledueDates,
                pairData.loanData.premiumPaymentSchedulepaymentAmounts
            ) = X7LendingPoolV1.getPremiumPaymentSchedule(pairData.loanID);

            pairData.loanData.principalDue = X7LendingPoolV1.getPrincipalDue(
                pairData.loanID,
                block.timestamp
            );

            (
                pairData.loanData.principalPaymentScheduledueDates,
                pairData.loanData.principalPaymentSchedulepaymentAmounts
            ) = X7LendingPoolV1.getPrincipalPaymentSchedule(pairData.loanID);

            pairData.loanData.totalDue = X7LendingPoolV1.getTotalDue(
                pairData.loanID,
                block.timestamp
            );

            pairData.loanData.loanTermActive = X7LendingPoolV1.loanTermActive(
                _pairAddress
            );

            pairData.loanData.loanTermLookup = X7LendingPoolV1.loanTermLookup(
                pairData.loanID
            );

            pairData.loanData.loanToken = X7LendingPoolV1.loanToken(
                pairData.loanID
            );
        }

        return pairData;
    }

    function getLoanID(address _pairAddress) internal view returns (int256) {
        IX7LendingPoolV1 X7LendingPoolV1 = IX7LendingPoolV1(lendingPoolAddress);

        uint256 nextLoanID = X7LendingPoolV1.nextLoanID();

        for (uint256 i = nextLoanID - 1; i >= 1; i--) {
            address loanPair = X7LendingPoolV1.loanPair(i);
            if (_pairAddress == loanPair) {
                return int256(i);
            }
        }
        return -1;
    }

    function getX7Pair(
        address _pair
    ) public view returns (PairData memory result) {
        return getPairData(_pair);
    }

    function getX7PairsList(
        address _Factory,
        uint256 _listLength
    ) public view returns (PairData[] memory) {
        IUniswapV2Factory factory = IUniswapV2Factory(_Factory);
        uint256 length = factory.allPairsLength();
        PairData[] memory result = new PairData[](length);
        uint256 smallerLength = length < _listLength ? length : _listLength; // calculate smaller length
        uint256 count = 0;

        for (uint256 i = smallerLength - 1; i >= 1; i--) {
            address pair = factory.allPairs(i);
            result[count] = getPairData(pair);
            count++;
        }
        return result;
    }
}
