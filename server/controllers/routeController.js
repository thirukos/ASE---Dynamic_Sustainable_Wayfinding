import RoutesModel from "../model/Routes.model.js";
export async function addroute(req, res)
{
    const username = req.params.username;
    const origin  = req.params.origin;
    const desination = req.params.desination;
    const distance = req.params.distance;
    const transportmode = req.params.transportmode;
    try{
        const route = new RoutesModel({
            username: username,
            origin: origin,
            desination: desination,
            distance: distance,
            transportmode: transportmode,
            whetherscore: '1'
        })
        route.save()
        .then(result => res.status(201).send({ msg: "a new route has been stored in the database"}))
        .catch(error => res.status(500).send({error}))
    }
    catch(error)
    {
        return res.status(500).send(error);
    }
}