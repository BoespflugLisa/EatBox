   M S B A M L   `   `   `  ����M  IClientLourd_EatBox, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null7 clr-namespace:ClientLourd_EatBoxClientLourd_EatBox  5   	   )    #ClientLourd_EatBox.Pages.Technicien   5      W SPresentationCore, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=6.0.2.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     5      R NSystem.Xaml, Version=6.0.2.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   2local clr-namespace:ClientLourd_EatBox     5   	   _ [MaterialDesignThemes.Wpf, Version=4.5.0.0, Culture=neutral, PublicKeyToken=df2a72020bd7962aFmaterialDesign1http://materialdesigninxaml.net/winfx/xaml/themes  5   	   $	��600��5      $
��1080��6'     � 	Resources  5	         	CloseMenu �� TargetProperty �� 
TargetName9  3System.Windows.Media.Animation.EasingDoubleKeyFrame O� KeyTime O� Value  OpenMenu��%P  &	        &	 �    �� 5
   
   .��5      U� $U O(UIElement.RenderTransform).(TransformGroup.Children)[3].(TranslateTransform.X)�6,   $ GridMenu��6�   .\�5        $ 0��6'   $	 250Q�63     5      $ 0:0:0.5��6'   $ 0Q�69   5      U� 5      $ (UIElement.Opacity)�6,   $ TecFrame��6\   .\�5        $ 0��6'   $ 1Q�63     5      $ 0:0:0.5��6'   $ 0Q�69   5      5      �� 5   
   .��5      U� $U O(UIElement.RenderTransform).(TransformGroup.Children)[3].(TranslateTransform.X)�6,   $ GridMenu��6�   .\�5        $ 0��6'   $ 0Q�63     5      $ 0:0:0.5��6'   $	 250Q�69   5      U� 5      $ (UIElement.Opacity)�6,   $ TecFrame��6\   .\�5        $ 0��6'   $ 0Q�63     5      $ 0:0:0.5��6'   $ 1Q�69   5      5      5      .��5'      � $
��Left=�6   $
��1070��6&    � RowDefinitions 5(   
   �� 5)      $	��99* �6   �� 5*      $
��101* �6    � ColumnDefinitions 5,   
   �� 5-      $	��29* �6   �� 5.      $	��91* �6   .+�51   
   � -   5         �Name$ GridMenu��51      $	��250��6!   $��Center=�6-   
�������$��2��6]   $��0,3,0,0q�6n   .+�53      �� .+�54      �� $	��100��6   $��/Assets/EatBox.png��6%   $��Uniform=�6A   �� 55      .@�56      �� .��57      �� -   5        
������ $��45��57   :   $��0q�6F   $	��229��6R   $��0q�6^    � Cursor$
 Hand��6r   .��58      �� 	 �� Orientation$	 
Horizontal=�6)   $	��230��6B   .+�59   "   '  !MaterialDesignThemes.Wpf.PackIcon  
   Kind$
 AccountWrench=�6:   $��20��6O   $��20��6Z   
�������$��5q�6x   $��Center=�6�   �� 5:   "   $
��Logs��6,   $��Champagne & Limousines)�68   $��10q�6`   
���   �$��18(�6   5;      5<      5=      �� 5>      .��5?      �� -   5        
������ $��45��5?   T   $��0q�6`   $	��229��6l   $��0q�6x   $
 Hand��6�   .��5@      �� $	 
Horizontal=�6)   $	��230��6B   .+�5A   "     $
 
EyeOutline=�6:   $��20��6L   $��20��6W   ���	#FFF08033$��5q�6z   $��Center=�6�   �� 5B   "   $��Supervision��6,   $��Champagne & Limousines)�6?   $��10q�6g   
���   �$��18(�6�   5C      5D      5E      �� 5F      .��5G      �� 
������ $��45��6:   $��0q�6F   $	��229��6R   $��0q�6^   $
 Hand��6r   .��5H      �� $	 
Horizontal=�6)   $	��230��6B   .+�5I   "     $
 
Connection=�6:   $��20��6L   $��20��6W   
��� � �$��5q�6v   $��Center=�6�   �� 5J   "   $��Reseau��6,   $��Champagne & Limousines)�6:   $��10q�6b   
���   �$��18(�6�   5K      5L      5M      �� 5N      .��5O      �� 
������ $��45��6:   $��0q�6F   $	��229��6R   $��0q�6^   $
 Hand��6r   .��5P      �� $	 
Horizontal=�6)   $	��230��6B   .+�5Q   "     $
 HandCoin=�6:   $��20��6J   $��20��6U   ���	#FFD41515$��5q�6x   $��Center=�6�   �� 5R   "   $��Services��6,   $��Champagne & Limousines)�6<   $��10q�6d   
���   �$��18(�6�   5S      5T      5U      �� 5V      .��5W      �� 
������ $��45��6:   $��0q�6F   $	��229��6R   $��0q�6^   $
 Hand��6r   .��5X      �� $	 
Horizontal=�6)   $	��230��6B   .+�5Y   "     $
 HammerWrench=�6:   $��20��6N   $��20��6Y   ���	#FFE6A701$��5q�6|   $��Center=�6�   �� 5Z   "   $��
Composants��6,   $��Champagne & Limousines)�6>   $��10q�6f   
���   �$��18(�6�   5[      5\      5]      5^      5_      5`       � 5a   
   -   5          �Name$ TecFrame��5a      ���	#55313131$��2��6:   $��
254,3,10,0q�6N   $��2��6b   $��Stretch=�6s   $��Stretch=�6�   $��Stretch=�6�   $��Stretch=�6�     � NavigationUIVisibility$ Hidden=�6�   5b      5d      