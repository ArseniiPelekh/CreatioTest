namespace Terrasoft.Configuration.UsrRealEstateNamespace
{
    using System;
    using System.Linq;
    using System.Runtime.Serialization;
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using Terrasoft.Core.Entities;
    using Terrasoft.Web.Common;

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrRealEstateService : BaseService
    {
        #region Class: CompletenessParameter

        [DataContract]
        public class CalculateByTypeParameter
        {

            #region Properties: Public

            [DataMember(Name = "typeId")]
            public Guid TypeId;

            [DataMember(Name = "typeSentenceId")]
            public Guid TypeSentenceId;

            #endregion

        }

        #endregion

        #region Methods: Public

        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json,
            BodyStyle = WebMessageBodyStyle.Wrapped,
            ResponseFormat = WebMessageFormat.Json)]
        public float CalculateRealEstatePropertyValueByType(CalculateByTypeParameter calculateParameter)
        {
            try
            {
                var realEstateEsq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "UsrRealEstate");
                realEstateEsq.AddColumn("UsrPriceUsd");
                var codeFilterType = realEstateEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "UsrType", calculateParameter.TypeId);
                var codeFilterTypeSentence = realEstateEsq.CreateFilterWithParameters(FilterComparisonType.Equal, "UsrTypeSentence", calculateParameter.TypeSentenceId);
                realEstateEsq.Filters.Add(codeFilterType);
                realEstateEsq.Filters.Add(codeFilterTypeSentence);

                var entities = realEstateEsq.GetEntityCollection(UserConnection);

                return entities.Sum(e => e.GetTypedColumnValue<float>("UsrPriceUsd"));
            }
            catch(Exception)
            {
                return -1;    
            }
        }

        #endregion

    }
}