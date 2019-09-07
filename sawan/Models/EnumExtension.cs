namespace sawan
{
    using System;
    using System.Linq;
    using System.Reflection;

    public static class EnumExtension
    {
        public static string GetDescription(this Enum someEnumeration)
        {
            Type genericEnumType = someEnumeration.GetType();
            MemberInfo[] memberInfo = genericEnumType.GetMember(someEnumeration.ToString());
            if ((memberInfo != null && memberInfo.Length > 0))
            {
                var attribute = memberInfo[0].GetCustomAttributes(typeof(System.ComponentModel.DescriptionAttribute), false);
                if ((attribute != null && attribute.Any()))
                {
                    return ((System.ComponentModel.DescriptionAttribute)attribute.ElementAt(0)).Description;
                }
            }
            return someEnumeration.ToString();
        }
    }
}