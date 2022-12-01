pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Aliens is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct AlienTraits {
        uint256 tokenId;
        string name;
        string description;
        string imageURI;
        uint256 health;
        uint256 stamina;
        uint256 strength;
        uint256 lastChecked;
    }

    mapping(uint256 => AlienTraits) public traitsById;

    event AlienUpdated(
        uint256 health,
        uint256 stamina,
        uint256 strength,
        uint256 checked,
        string uri,
        uint256 index
    );

    constructor() ERC721("Alien", "ALN") {
        // safeMint(msg.sender, "test");
    }

    function safeMint(address to, string memory ipfsImage) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        traitsById[tokenId] = AlienTraits({
            tokenId: tokenId,
            name: "Alien",
            description: "Default Alien",
            imageURI: ipfsImage,
            health: 100,
            stamina: 20,
            strength: 30,
            lastChecked: block.timestamp
        });
        // Set the URI for the token to include all of the attributes
        _setTokenURI(tokenId, tokenURI(tokenId));
    }

    function safeMintCustom(
        address to,
        string memory ipfsImage,
        string memory alienName,
        string memory alienDescription,
        uint256 alienHealth,
        uint256 alienStamina,
        uint256 alienStrength
    ) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        traitsById[tokenId] = AlienTraits({
            tokenId: tokenId,
            name: alienName,
            description: alienDescription,
            imageURI: ipfsImage,
            health: alienHealth,
            stamina: alienStamina,
            strength: alienStrength,
            lastChecked: block.timestamp
        });
        // Set the URI for the token to include all of the attributes
        _setTokenURI(tokenId, tokenURI(tokenId));
    }

    // return a random number 1-5
    function random5(uint256 nonce) private view returns (uint256) {
        uint256 randomHash = uint256(
            keccak256(
                abi.encodePacked(
                    block.difficulty,
                    block.timestamp,
                    msg.sender,
                    nonce
                )
            )
        );
        return (randomHash % 5) + 1;
    }

    function invade(uint256 tokenIdA, uint256 tokenIdB) public {
        require(
            ownerOf(tokenIdA) == msg.sender,
            "caller must be the token A owner"
        );
        require(
            ownerOf(tokenIdB) != msg.sender,
            "target owner must NOT be the caller"
        );

        // boost token A stats
        (
            uint256 health_a,
            uint256 stamina_a,
            uint256 strength_a,
            ,

        ) = alienStats(tokenIdA);
        uint256 boosted_stamina_a = stamina_a * random5(tokenIdA * 16);
        uint256 boosted_strength_a = strength_a * random5(tokenIdA * 18);

        // boost token B stats
        (
            uint256 health_b,
            uint256 stamina_b,
            uint256 strength_b,
            ,

        ) = alienStats(tokenIdA);
        uint256 boosted_stamina_b = stamina_b * random5(tokenIdB + 16);
        uint256 boosted_strength_b = strength_b * random5(tokenIdB + 18);

        // damage token A
        uint256 damaged_health_a = health_a +
            boosted_stamina_a -
            boosted_strength_b;

        // damage token B
        uint256 damaged_health_b = health_b +
            boosted_stamina_b -
            boosted_strength_a;

        // check who has more health
        uint256 defeatedTokenId = type(uint256).max;
        if (damaged_health_a > damaged_health_b) {
            defeatedTokenId = tokenIdB;
        } else if (damaged_health_b > damaged_health_a) {
            defeatedTokenId = tokenIdA;
        }

        // burn loser nft
        if (defeatedTokenId != type(uint256).max) {
            _burn(defeatedTokenId);
            delete traitsById[defeatedTokenId];
        }
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        // Select the attributes for the token we are referencing
        AlienTraits memory alienTraits = traitsById[_tokenId];

        // The result of this function is a string.
        // Each of these values, health, stamina, strength
        // is stored as a uint256, they need to be converted to strings
        string memory strhealth = Strings.toString(alienTraits.health);
        string memory strstamina = Strings.toString(alienTraits.stamina);
        string memory strstrength = Strings.toString(alienTraits.strength);

        // abi.encodePacked is used to combine the strings into a single value.
        string memory json = string(
            abi.encodePacked(
                '{"name": "',
                alienTraits.name,
                '",',
                '"description": "',
                alienTraits.description,
                '",',
                '"image": "',
                alienTraits.imageURI,
                '",',
                '"traits": [',
                '{"trait_type": "stamina","value": ',
                strstamina,
                '}, {"trait_type": "strength", "value": ',
                strstrength,
                '}, {"trait_type": "health","value": ',
                strhealth,
                "}]",
                "}"
            )
        );
        return json;
    }

    function alienStats(uint256 _tokenId)
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            string memory
        )
    {
        return (
            traitsById[_tokenId].health,
            traitsById[_tokenId].stamina,
            traitsById[_tokenId].strength,
            traitsById[_tokenId].lastChecked,
            traitsById[_tokenId].imageURI
        );
    }

    function updateURI(uint256 _tokenId, string memory ipfsImage) private {
        //update the attributes for the token
        traitsById[_tokenId].imageURI = ipfsImage;
        // set the token URI to the new values
        _setTokenURI(_tokenId, tokenURI(_tokenId));
        emitUpdate(_tokenId);
    }

    function emitUpdate(uint256 _tokenId) internal {
        emit AlienUpdated(
            traitsById[_tokenId].health,
            traitsById[_tokenId].stamina,
            traitsById[_tokenId].strength,
            traitsById[_tokenId].lastChecked,
            traitsById[_tokenId].imageURI,
            _tokenId
        );
    }
}
