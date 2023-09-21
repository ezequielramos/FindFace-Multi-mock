import { Express, Request, Response } from 'express';
import multer from 'multer';
import { validAuthorization } from '../services/route_middlewares';
import { getHuman } from '../controllers/humans';
import { createFace, deleteFace, getFace } from '../controllers/faces';

const upload = multer({
    storage: multer.memoryStorage()
});

function loadObjectsRoutes(app: Express) {
    app.post('/objects/faces/', validAuthorization, upload.any(), async (req: Request, res: Response) => {
        let photo;

        if (!req.body.card) {
            return res.status(400).json({
                "traceback": "",
                "code": "BAD_PARAM",
                "desc": "This field is required.",
                "param": "card"
            });
        }

        const human = getHuman(Number(req.body.card));

        if (!human) {
            return res.status(400).json({
                "traceback": "",
                "code": "BAD_PARAM",
                "desc": `Invalid pk \\"${req.body.card}\\" - object does not exist.`,
                "param": "card"
            });
        }

        if (req.files) {
            const files = req.files as Express.Multer.File[];
            photo = files.find((file) => file.fieldname == "source_photo");
        }

        if (!photo) {
            return res.status(400).json({
                "traceback": "",
                "code": "BAD_PARAM",
                "desc": "source_photo must be provided",
                "param": "source_photo"
            });
        }

        // TODO: no face on picture
        // return res.status(400).json({
        //     "traceback": "",
        //     "code": "BAD_PARAM",
        //     "desc": "All objects on a photo are of low quality or no objects found",
        //     "param": "source_photo"
        // });

        // TODO: more than one face on picture
        // return res.status(400).json({
        //     "traceback": "",
        //     "code": "BAD_PARAM",
        //     "desc": "Expected one object, found N",
        //     "param": "source_photo"
        // });

        const face = createFace(human.id, photo);

        return res.status(200).json(face);

    });

    app.delete('/objects/faces/:faceId/', validAuthorization, async (req: Request, res: Response) => {
        const face = getFace(req.params.faceId);

        if (!face) {
            return res.status(404).json({
                "traceback": "",
                "code": "NOT_FOUND",
                "desc": "No FaceObject matches the given query."
            });
        }

        deleteFace(face.id);

        return res.status(204).send();
    });

}

export { loadObjectsRoutes };