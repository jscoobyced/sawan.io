using System.Diagnostics;

namespace sawan
{
    public class ProcessRunner
    {
        public void RunScript(string script, string argument)
        {
            ProcessStartInfo psi = new ProcessStartInfo();
            psi.FileName = script;
            psi.UseShellExecute = false;
            psi.RedirectStandardOutput = true;

            psi.Arguments = argument;
            Process p = Process.Start(psi);
            p.WaitForExit();
        }
    }
}