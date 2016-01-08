using Radevski.Models.DbEntity;
using RCA.Model.Dto;
using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;

namespace RCA.WebApi.Controllers
{
    public class HomeController : ApiController
    {
        #region Initialize

        private ApplicationDbContext _db;

        public HomeController()
        {
            _db = new ApplicationDbContext();
        }

        #endregion

        #region Drop Id

        [System.Web.Http.HttpGet]
        public string GetDropID()
        {
            string result = string.Empty;
            var cusCount = _db.Customization.OrderByDescending(c => c.Id).Take(1).FirstOrDefault();
            if (cusCount == null)
            {
                result = "R00001";
            }
            else
            {
                int num = Convert.ToInt32(cusCount.DropId.Substring(1));
                num += 1;

                string s = string.Empty;
                string d = string.Empty;
                int n = 1;

                while (n < 6)
                {
                    if (d.Length == 5)
                        break;
                    s += "0";
                    d = s + num.ToString();
                    n++;
                }
                result = "R" + d;
            }
            return result;
        }

        #endregion

        #region Receivable

        [System.Web.Http.HttpPost]
        public bool CreateReceivable(RCA.Model.Dto.Receivable model)
        {
            using (var dbContextTransaction = _db.Database.BeginTransaction())
            {
                try
                {
                    //add customization
                    Customization dbCustomization = new Customization();
                    dbCustomization.DropId = model.dropid;
                    dbCustomization.CurrentLocation = model.locationId;
                    dbCustomization.Source = model.sourceId;
                    dbCustomization.BinTotal = model.binTotal;
                    dbCustomization.DeliverDate = Convert.ToDateTime(model.myDate);
                    dbCustomization.Comments = model.comments;

                    _db.Entry(dbCustomization).State = EntityState.Added;
                    _db.SaveChanges();

                    //add receivable
                    Radevski.Models.DbEntity.Receivable receivable = new Radevski.Models.DbEntity.Receivable();

                    if (model.manualist == null)
                    {
                        receivable.CustomizationId = dbCustomization.Id;
                        receivable.Fruit = model.fruitType;
                        receivable.BinType = model.binType;
                        receivable.BinCount = model.numBin;
                        receivable.IsCustomer = model.customerBin;
                        _db.Entry(receivable).State = EntityState.Added;
                        _db.SaveChanges();
                    }
                    else
                    {
                        foreach (items item in model.manualist)
                        {
                            receivable.CustomizationId = dbCustomization.Id;
                            receivable.Fruit = item.fruitType;
                            receivable.BinType = item.binType;
                            receivable.BinCount = item.numBin;
                            receivable.IsCustomer = item.customerBin;

                            _db.Entry(receivable).State = EntityState.Added;
                            _db.SaveChanges();
                        }
                    }
                    dbContextTransaction.Commit();
                    return true;
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    return false;
                }
            }
        }

        #endregion

        #region Asset

        [System.Web.Http.HttpPost]
        public bool CreateAsset(RCA.Model.Dto.Asset model)
        {
            using (var dbContextTransaction = _db.Database.BeginTransaction())
            {
                try
                {
                    //add customization
                    Customization dbCustomization = new Customization();
                    dbCustomization.DropId = model.dropid;
                    dbCustomization.CurrentLocation = model.locationId;
                    dbCustomization.Source = model.sourceId;
                    dbCustomization.BinTotal = model.binTotal;
                    dbCustomization.DeliverDate = Convert.ToDateTime(model.myDate);
                    dbCustomization.Comments = model.comments;

                    _db.Entry(dbCustomization).State = EntityState.Added;
                    _db.SaveChanges();

                    //add asset
                    Radevski.Models.DbEntity.Asset asset = new Radevski.Models.DbEntity.Asset();

                    if (model.manualist == null)
                    {
                        asset.CustomizationId = dbCustomization.Id;
                        asset.Direction = model.direction;
                        asset.BinType = model.binType;
                        asset.BinCount = model.numBin;
                        asset.IsCustomer = model.customerBin;
                        _db.Entry(asset).State = EntityState.Added;
                        _db.SaveChanges();
                    }
                    else
                    {
                        foreach (AccsetItems item in model.manualist)
                        {
                            asset.CustomizationId = dbCustomization.Id;
                            asset.Direction = item.direction;
                            asset.BinType = item.binType;
                            asset.BinCount = item.numBin;
                            asset.IsCustomer = item.isCustomer;

                            _db.Entry(asset).State = EntityState.Added;
                            _db.SaveChanges();
                        }
                    }
                    dbContextTransaction.Commit();
                    return true;
                }
                catch (Exception ex)
                {
                    dbContextTransaction.Rollback();
                    return false;
                }
            }
        }

        #endregion
    }
}