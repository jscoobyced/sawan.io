namespace sawan
{
    using System;

    public class Link
    {
        public string Text { get; set; }
        public string Url { get; set; }
        public string Target { get; set; }
        public string Title { get; set; }

        public override bool Equals(object obj)
        {
            var other = obj as Link;
            if (other == null)
            {
                return false;
            }
            return Text == other.Text
                && Url == other.Url
                && Target == other.Target
                && Title == other.Title;
        }

        public override int GetHashCode()
        {
            var hashCode = Text?.GetHashCode() + Url?.GetHashCode() + Target?.GetHashCode() + Title?.GetHashCode();
            return hashCode == null ? -1 : (int)hashCode;
        }
    }
}