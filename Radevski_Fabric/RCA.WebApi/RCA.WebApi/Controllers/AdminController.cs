using RCA.Model.Dto;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;

namespace RCA.WebApi.Controllers
{
    public class AdminController : ApiController
    {
        #region Initialize

        private ApplicationDbContext _db;

        public AdminController()
        {
            _db = new ApplicationDbContext();
        }

        #endregion

        #region Fruit

        [System.Web.Http.HttpGet]
        public List<Fruit> GetFruit()
        {
            var fruit = (from t in _db.Fruit
                         join t0 in _db.FruitCategory on new { CategoryId = t.CategoryId } equals new { CategoryId = t0.Id }
                         select new Fruit()
                         {
                             Id = t.Id,
                             CategoryId = t0.Id,
                             CategoryName = t0.CategoryName,
                             FruitName = t.FruitName
                         }).OrderByDescending(c => c.Id).ToList();
            return fruit;
        }

        [System.Web.Http.HttpGet]
        public List<Fruit> GetFruitByCategory(int id)
        {
            var fruit = (from c in _db.Fruit
                         select new Fruit()
                         {
                             Id = c.Id,
                             CategoryId = c.CategoryId,
                             FruitName = c.FruitName
                         }).Where(c => c.CategoryId == id).OrderByDescending(c => c.Id).ToList();
            return fruit;
        }

        [System.Web.Http.HttpPost]
        public bool AddFruit(Fruit fruit)
        {
            //TODO mapper
            Radevski.Models.DbEntity.Fruit dbFruit = new Radevski.Models.DbEntity.Fruit();
            dbFruit.CategoryId = fruit.CategoryId;
            dbFruit.FruitName = fruit.FruitName;

            _db.Entry(dbFruit).State = EntityState.Added;
            int result = _db.SaveChanges();
            if (result == 1)
                return true;
            else
                return false;
        }

        [System.Web.Http.HttpGet]
        public bool DeleteFruit(int id)
        {
            var fruit = _db.Fruit.Find(id);
            if (fruit != null)
            {
                _db.Fruit.Remove(fruit);
                _db.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        [System.Web.Http.HttpPost]
        public bool EditFruit(Fruit fruit)
        {
            var editFruit = _db.Fruit.Find(fruit.Id);
            if (editFruit != null)
            {
                editFruit.CategoryId = fruit.CategoryId;
                editFruit.FruitName = fruit.FruitName;

                _db.Entry(editFruit).State = EntityState.Modified;
                int result = _db.SaveChanges();
                if (result == 1)
                    return true;
                else
                    return false;
            }
            else
            {
                return false;
            }
        }


        #endregion

        #region Fruit category

        [System.Web.Http.HttpGet]
        public List<Fruit> GetFruitCategory()
        {
            var fruitCategory = (from c in _db.FruitCategory
                                 select new Fruit()
                                 {
                                     CategoryId = c.Id,
                                     CategoryName = c.CategoryName
                                 }).OrderByDescending(c => c.CategoryId).ToList();
            return fruitCategory;
        }

        [System.Web.Http.HttpPost]
        public bool AddFruitCategory(Fruit fruit)
        {
            Radevski.Models.DbEntity.FruitCategory dbFruitCategory = new Radevski.Models.DbEntity.FruitCategory();
            dbFruitCategory.CategoryName = fruit.CategoryName;

            _db.Entry(dbFruitCategory).State = EntityState.Added;
            int result = _db.SaveChanges();
            if (result == 1)
                return true;
            else
                return false;
        }

        [System.Web.Http.HttpGet]
        public bool DeleteFruitCategory(int id)
        {
            var fruitCategory = _db.FruitCategory.Find(id);
            if (fruitCategory != null)
            {
                _db.FruitCategory.Remove(fruitCategory);
                _db.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        [System.Web.Http.HttpPost]
        public bool EditFruitCategory(Fruit fruit)
        {
            var editFruit = _db.FruitCategory.Find(fruit.CategoryId);
            if (editFruit != null)
            {
                editFruit.CategoryName = fruit.CategoryName;

                _db.Entry(editFruit).State = EntityState.Modified;
                int result = _db.SaveChanges();
                if (result == 1)
                    return true;
                else
                    return false;
            }
            else
            {
                return false;
            }
        }

        #endregion

        #region Location type

        [System.Web.Http.HttpGet]
        public List<Location> GetLocationType()
        {
            var locationType = (from c in _db.LocationType
                                select new Location()
                                {
                                    LocationId = c.Id,
                                    LocationType = c.TypeName
                                }).OrderByDescending(c => c.LocationId).ToList();
            return locationType;
        }

        [System.Web.Http.HttpPost]
        public bool AddLocationType(Location location)
        {
            Radevski.Models.DbEntity.LocationType dbLocationType = new Radevski.Models.DbEntity.LocationType();
            dbLocationType.TypeName = location.LocationType;

            _db.Entry(dbLocationType).State = EntityState.Added;
            int result = _db.SaveChanges();
            if (result == 1)
                return true;
            else
                return false;
        }

        [System.Web.Http.HttpGet]
        public bool DeleteLocationType(int id)
        {
            var locationType = _db.LocationType.Find(id);
            if (locationType != null)
            {
                _db.LocationType.Remove(locationType);
                _db.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        [System.Web.Http.HttpPost]
        public bool EditLocationType(Location location)
        {
            var editLocation = _db.LocationType.Find(location.LocationId);
            if (editLocation != null)
            {
                editLocation.TypeName = location.LocationType;

                _db.Entry(editLocation).State = EntityState.Modified;
                int result = _db.SaveChanges();
                if (result == 1)
                    return true;
                else
                    return false;
            }
            else
            {
                return false;
            }
        }

        #endregion

        #region Location

        [System.Web.Http.HttpGet]
        public List<Location> GetLocation()
        {
            var location = (from t in _db.Location
                            join t0 in _db.LocationType on new { Id = t.TypeId } equals new { Id = t0.Id }
                            select new Location()
                            {
                                LocationId = t.Id,
                                LocationType = t0.TypeName,
                                LocationName = t.LocationName
                            }).OrderByDescending(c => c.LocationId).ToList();
            return location;
        }

        [System.Web.Http.HttpGet]
        public List<Location> GetLocationByType(int id)
        {
            var locationType = (from c in _db.Location
                                select new Location()
                                {
                                    LocationId = c.Id,
                                    LocationTypeId = c.TypeId,
                                    LocationName = c.LocationName
                                }).Where(c => c.LocationTypeId == id).OrderByDescending(c => c.LocationId).ToList();
            return locationType;
        }

        [System.Web.Http.HttpPost]
        public bool AddLocation(Location locaiton)
        {
            //TODO mapper
            Radevski.Models.DbEntity.Location dbLocation = new Radevski.Models.DbEntity.Location();
            dbLocation.TypeId = locaiton.LocationTypeId;
            dbLocation.LocationName = locaiton.LocationName;

            _db.Entry(dbLocation).State = EntityState.Added;
            int result = _db.SaveChanges();
            if (result == 1)
                return true;
            else
                return false;
        }

        [System.Web.Http.HttpGet]
        public bool DeleteLocation(int id)
        {
            var location = _db.Location.Find(id);
            if (location != null)
            {
                _db.Location.Remove(location);
                _db.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        [System.Web.Http.HttpPost]
        public bool EditLocation(Location location)
        {
            var editLocation = _db.Location.Find(location.LocationId);
            if (editLocation != null)
            {
                editLocation.TypeId = location.LocationTypeId;
                editLocation.LocationName = location.LocationName;

                _db.Entry(editLocation).State = EntityState.Modified;
                int result = _db.SaveChanges();
                if (result == 1)
                    return true;
                else
                    return false;
            }
            else
            {
                return false;
            }
        }


        #endregion

        #region Bin Type

        [System.Web.Http.HttpGet]
        public List<BinType> GetBinType()
        {
            var binType = (from c in _db.BinType
                           select new BinType()
                           {
                               Id = c.Id,
                               TypeName = c.TypeName
                           }).OrderByDescending(c => c.Id).ToList();
            return binType;
        }

        #endregion
    }
}
