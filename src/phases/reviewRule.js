/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const curatorView = () => {

    const view = [
        theCollection(true),
    ]

    if (!gameState.isCuratorReady) {
        view.push({
            type: "TITLE",
            data: {
                title: "Check Rule",
                description: "Are any of these your rule?",
            },
            child: {
                type: `CARD_LIST`,
                data: gameState.ruleGuesses.map((guess) => {
                    return {
                        text: guess.guess,
                    };
                }),
                settings: {
                    maxSelectable: 1,
                },
            },
        })
        view.push({
            type: `SUBMIT_BUTTON`,
            data: `No`,
        })
    }
    
    return ({
        player: gameState.curator,
        view    
    })
}

const playerWaitingView = (player) => ({
    player,
    view: [
        theCollection(),
        {
            type: "TITLE",
            data: {
                title: "Waiting for",
            },
            child: {
                type: `CARD_LIST`,
                data: [
                    gameState.curator.name,
                ],
                settings: {
                    maxSelectable: 1,
                },
            },
        }
    ]
})

const renderViews = () => {
    playerViews = gameState.players.map((player) => playerWaitingView(player))

    playerViews.push(curatorView());
}

const onInitialisation = () => {
    gameState.isCuratorReady = false;

    renderViews();
};

const onSubmit = () => {
    if (context.playerView.player._id === gameState.curator._id) {
        if (context.component === 1) {
            const winningAnswer = context.playerView.view[1].child.data.find(
                (card) => card.selected,
            ).text;

            gameState.winner = gameState.ruleGuesses.find(guess => guess.guess === winningAnswer)

            phaseName = "announceWinner"
        } else {
            phaseName = "submitItems"
        }
    }
};

const onTimeout = () => {};

const onPlayerJoined = () => {};

const onPlayerLeft = () => {};
