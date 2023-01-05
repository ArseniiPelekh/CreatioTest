namespace Terrasoft.Configuration.UsrRealEstateNamespace
{
    using System;
    using System.Linq;
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using Terrasoft.Core.Entities;
    using Terrasoft.Web.Common;

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrRealEstateService : BaseService
    {
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Wrapped,
            ResponseFormat = WebMessageFormat.Json)]
        public decimal CalculateRealEstatePropertyValueByType(string advertisementCode)
        {
            decimal result = -1;
            if (string.IsNullOrEmpty(advertisementCode))
            {
                return result;
            }

            return result;
        }
		
		[OperationContract]
        [WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public decimal Get()
        {
            decimal result = -1;
            return result;
        }
    }
}