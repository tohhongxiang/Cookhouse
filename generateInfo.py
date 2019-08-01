import json
import datetime


state = {"weekMenu": []}
date = datetime.datetime.now()
for i in range(100):
  newdate = date + datetime.timedelta(days=i)
  nums = str(newdate).split()[0].split("-")
  state["weekMenu"].append({
        "date": "new Date({}, {}, {})".format(nums[0], nums[1], nums[2]),
        "id": "uuid.v4()", 
        "menu": [ 
          {
            "menuType":"Muslim",
            "foodList": ["Muslim food 1", "Muslim food 2", "Muslim food 3"] 
          }, 
          {
            "menuType":"Non-muslim",
            "foodList": ["Non-muslim food 1", "Non-muslim food 2", "Non-muslim food 3"]
          }, 
          {
            "menuType":"Vegetarian",
            "foodList": ["Vegetarian food 1", "Vegetarian food 2", "Vegetarian food 3"]
          }
        ]
      })

with open("info.json", "w") as f:
  json.dump(state, f)
