import RoutesModel from "../model/Routes.model.js";
import UserModel from '../model/Users.model.js'
export async function addroute(req, res) {
    const { username, origin, desination, distance, transportmode } = req.body;

    try {
        const route = new RoutesModel({
            "username": username,
            "origin": origin,
            "desination": desination,
            "distance": distance,
            "transportmode": transportmode,
            "whetherscore": '1'
        })
        route.save()
            .then(result => res.status(201).send({ msg: "a new route has been stored in the database" }))
            .catch(error => res.status(500).send({ error }))
    }
    catch (error) {
        return res.status(500).send(error);
    }

    try {
       //DRIVING 0.2 WALKING 1 BICYCLING 0.8 TRANSIT 0.5
        let addscore = 0
        if(transportmode == "DRIVING")
        addscore = 0.2 * distance
        else if(transportmode == "WALKING")
        addscore = distance
        else if(transportmode =="BICYCLING")
        addscore = 0.8 * distance
        else if (transportmode == "TRANSIT")
        addscore = 0.5 * distance 
        else
        {
            return res.status(401).send({ error : "dont know which should be obtained"});
        }
        console.log(addscore);
        if(username)
        {
            UserModel.findOne({ username: username }, function (err, user) 
            {
                if(err)console.log('err');
                else
                {
                    user.score+= addscore;
                    //console.log("show user score whether update"+user.score);
                }
                user.save()

            })
        }
        else
        {
            return res.status(401).send({ error : "User Not Found...!"});
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
    
}

