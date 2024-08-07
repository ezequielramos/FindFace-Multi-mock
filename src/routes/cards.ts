import { Express, Request, Response } from 'express';
import { validAuthorization } from '../services/route_middlewares';
import { createHuman, deleteHuman, getHuman } from '../controllers/humans';
import { getWatchLists } from '../controllers/watch-lists';

function loadCardRoutes(app: Express) {

    app.get('/cards/humans/', validAuthorization, async (req: Request, res: Response) => {
        return res.status(200).json({
            "next_page": null,
            "prev_page": null,
            "results": []
        });

    });

    app.post('/cards/humans/', validAuthorization, async (req: Request, res: Response) => {
        if (!req.body.name) {
            return res.status(400).json({
                "traceback": "",
                "code": "BAD_PARAM",
                "desc": "This field is required.",
                "param": "name"
            });
        }

        if (!req.body.watch_lists) {
            return res.status(400).json({
                "traceback": "",
                "code": "BAD_PARAM",
                "desc": "This field is required.",
                "param": "watch_lists"
            });
        }

        let watchLists = req.body.watch_lists;

        if (!Array.isArray(watchLists)) {
            watchLists = [req.body.watch_lists];
        }

        if (watchLists.includes(-1)) {
            return res.status(400).json({
                "traceback": "",
                "code": "BAD_PARAM",
                "desc": "You can't add watch list \"Unmatched\" to a card",
                "param": "watch_lists"
            });
        }

        const watchListsIds = getWatchLists().filter(wl => wl.id != -1).map(wl => wl.id);

        for (const watchList of watchLists) {

            if (!watchListsIds.includes(watchList)) {

                const missingPermissions = watchLists
                    .filter((v: string | number) => !(watchListsIds.includes(Number(v))))
                    .map((v: string | number) => `Watch list(${v}) - view`);

                return res.status(403).json({
                    "traceback": "",
                    "code": "PERMISSION_DENIED",
                    "desc": "Permission denied",
                    "missing_permissions": missingPermissions
                });
            }

        }

        const human = createHuman({
            name: req.body.name,
            active: req.body.active ?? true,
            watchLists
        });

        return res.status(200).json(human);

    });

    app.patch('/cards/humans/:humanId/', validAuthorization, async (req: Request, res: Response) => {

        const human = getHuman(Number(req.params.humanId));

        if (!human) {
            return res.status(404).json({
                "traceback": "",
                "code": "NOT_FOUND",
                "desc": "No HumanCard matches the given query."
            });
        }

        if (req.body.name) {
            human.name = req.body.name;
        }

        if (req.body.active) {
            human.active = req.body.active;
        }

        return res.status(200).json(human);

    });

    app.delete('/cards/humans/:humanId/', validAuthorization, async (req: Request, res: Response) => {

        const human = getHuman(Number(req.params.humanId));

        if (!human) {
            return res.status(404).json({
                "traceback": "",
                "code": "NOT_FOUND",
                "desc": "No HumanCard matches the given query."
            });
        }

        deleteHuman(human.id);

        return res.status(204).send();

    });

}

export { loadCardRoutes };
