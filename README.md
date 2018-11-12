
# **DeepStorm**

##	**Replay analysis tool for Heroes of the Storm**
### /*** Version 0.0.1 - Development build	***/

Tool created with the purpose of analyzing player replays and providing estimated success/efficiency rate based on historical data 
This project´s target is to analyze 


## Installation:
(Requires Nodejs to be installed previously)

```
git clone 
navigate to cloned root directory
npm install

```

## Development Milestones

- Capacity to parse replay files or accumulated data from databases such as [Hotslogs](https://www.hotslogs.com/Default). 
- Quickly filter replay data based on the match content: *contains hero, map, win/lose team model* (2tank-2assasin-1)*, game patch...*
- Acumulate data from each parsed replay. (Might not be possible in 30 days)
- Given the large number of possible heroes present in a match, the map itself and the possible build choices, a machine learning model will require humongous amounts of replay data to get minimum efficiency. This might become a hard-wall even in the best case scenario, but we will try to avoid it by passing heroes as the output numbers they got through the match. The idea is that 2 different heroes can provide a with similar cualities. The idea is to find what team composition is preferable to play around a map or an enemy´s team composition.
- More to be elaborated later on...


Disclaimer notes: 
- The first interations will focus on the study of a single map and maybe a reduced hero pool. 
- As far as I know, there is no way to measure displacements nor their outcomes which are a critical part of the kit of some heroes.
