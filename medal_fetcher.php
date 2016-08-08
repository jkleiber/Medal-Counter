<?php

	$medal_json = @file_get_contents("http://www.medalbot.com/api/v1/medals");
	$medal_decode = json_decode($medal_json, true);
	
	if($medal_json === FALSE)
	{
		echo "Medal Count unavailable at this time.";
	}
	else
	{
		usort($medal_decode, function($a,$b) 
		{
			$total_a = $a['gold_count'] + $a['silver_count'] + $a['bronze_count'];
			$total_b = $b['gold_count'] + $b['silver_count'] + $b['bronze_count'];
			
			if($total_a > $total_b)
			{
				return -1;
			}
			else if($total_b > $total_a)
			{
				return 1;
			}
			else
			{
				if($a['gold_count'] > $b['gold_count'])
				{
					return -1;
				}
				else if($b['gold_count'] > $a['gold_count'])
				{
					return 1;
				}
				else
				{
					if($a['silver_count'] > $b['silver_count'])
					{
						return -1;
					}
					else if($b['silver_count'] > $a['silver_count'])
					{
						return 1;
					}
					else
					{
							if($a['bronze_count'] > $b['bronze_count'])
							{
								return -1;
							}
							else if($b['bronze_count'] > $a['bronze_count'])
							{
								return 1;
							}
							else
							{
								return strnatcasecmp($a['country_name'],$b['country_name']);
							}
					}
				}
			}
		});
	
		echo json_encode($medal_decode);
	}
?>